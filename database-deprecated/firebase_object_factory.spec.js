import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseObjectObservable, FirebaseObjectFactory } from 'angularfire2/database-deprecated';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
describe('FirebaseObjectFactory', function () {
    var i = 0;
    var ref;
    var observable;
    var subscription;
    var nextSpy;
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, '[DEFAULT]'),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should accept a Firebase db ref in the constructor', function () {
            var object = FirebaseObjectFactory(app.database().ref().child("questions"));
            expect(object instanceof FirebaseObjectObservable).toBe(true);
        });
    });
    describe('methods', function () {
        beforeEach(function (done) {
            i = Date.now();
            ref = app.database().ref().child("questions/" + i);
            nextSpy = nextSpy = jasmine.createSpy('next');
            observable = FirebaseObjectFactory(app.database().ref("questions/" + i));
            ref.remove(done);
        });
        afterEach(function () {
            if (subscription && !subscription.closed) {
                subscription.unsubscribe();
            }
        });
        it('should emit a null value if no value is present when subscribed', function (done) {
            subscription = observable.subscribe(function (unwrapped) {
                var expectedObject = { $key: observable.$ref.key, $value: null };
                expect(unwrapped.$key).toEqual(expectedObject.$key);
                expect(unwrapped.$value).toEqual(expectedObject.$value);
                expect(unwrapped.$exists()).toEqual(false);
                done();
            });
        });
        it('should emit unwrapped data by default', function (done) {
            var fixtureData = { data: 'bar' };
            ref.set(fixtureData, function () {
                subscription = observable.subscribe(function (unwrapped) {
                    if (!unwrapped)
                        return;
                    expect(unwrapped.$key).toEqual(ref.key);
                    expect(unwrapped).toEqual(fixtureData);
                    expect(unwrapped.$exists()).toEqual(true);
                    done();
                });
            });
        });
        it('should emit unwrapped data with $ properties for primitive values', function (done) {
            ref.set('fiiiireeee', function () {
                subscription = observable.subscribe(function (val) {
                    if (!val)
                        return;
                    expect(val.$key).toEqual(ref.key);
                    expect(val.$value).toEqual('fiiiireeee');
                    expect(val.$exists()).toEqual(true);
                    done();
                });
            });
        });
        it('should emit null for $ properties for primitive values', function (done) {
            subscription = observable.subscribe(function (val) {
                if (!val)
                    return;
                expect(val.$key).toEqual(ref.key);
                expect(val.$value).toEqual(null);
                expect(val.$exists()).toEqual(false);
                done();
            });
        });
        it('should emit snapshots if preserveSnapshot option is true', function (done) {
            observable = FirebaseObjectFactory(app.database().ref("questions/" + i), { preserveSnapshot: true });
            ref.remove(function () {
                ref.set('preserved snapshot!', function () {
                    subscription = observable.subscribe(function (data) {
                        expect(data.val()).toEqual('preserved snapshot!');
                        done();
                    });
                });
            });
        });
        it('should call off on all events when disposed', function () {
            var dbRef = app.database().ref();
            var firebaseSpy = spyOn(dbRef, 'off');
            subscription = FirebaseObjectFactory(dbRef).subscribe();
            expect(firebaseSpy).not.toHaveBeenCalled();
            subscription.unsubscribe();
            expect(firebaseSpy).toHaveBeenCalled();
        });
        it('should emit values in the observable creation zone', function (done) {
            Zone.current.fork({
                name: 'newZone'
            })
                .run(function () {
                subscription = FirebaseObjectFactory(app.database().ref("questions/" + i))
                    .filter(function (d) { return d.$value === 'in-the-zone'; })
                    .subscribe(function (data) {
                    expect(Zone.current.name).toBe('newZone');
                    done();
                });
            });
            ref.remove(function () {
                ref.set('in-the-zone');
            });
        });
    });
});
//# sourceMappingURL=firebase_object_factory.spec.js.map