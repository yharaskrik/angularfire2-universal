import { TestBed, inject } from '@angular/core/testing';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { COMMON_CONFIG } from './test-config';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { map } from 'rxjs/operator/map';
describe('FirebaseObjectObservable', function () {
    var O;
    var ref;
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase], function (_app, _db) {
            app = _app;
            db = _db;
            ref = app.database().ref();
            O = new FirebaseObjectObservable(function (observer) {
            }, ref);
        })();
    });
    afterEach(function (done) {
        ref.off();
        ref.remove();
        app.delete().then(done, done.fail);
    });
    it('should return an instance of FirebaseObservable when calling operators', function () {
        var O = new FirebaseObjectObservable(function (observer) { });
        expect(map.call(O, noop) instanceof FirebaseObjectObservable).toBe(true);
    });
    describe('$ref', function () {
        it('should match the database path passed in the constructor', function () {
            expect(O.$ref.toString()).toEqual(ref.toString());
        });
    });
    describe('set', function () {
        it('should call set on the underlying ref', function (done) {
            var setSpy = spyOn(ref, 'set');
            O.subscribe();
            O.set(1);
            expect(setSpy).toHaveBeenCalledWith(1);
            done();
        });
        it('should throw an exception if set when not subscribed', function () {
            O = new FirebaseObjectObservable(function (observer) { });
            expect(function () {
                O.set('foo');
            }).toThrowError('No ref specified for this Observable!');
        });
        it('should accept any type of value without compilation error', function () {
            O.set('foo');
        });
        it('should resolve returned thenable when successful', function (done) {
            O.set('foo').then(done, done.fail);
        });
    });
    describe('update', function () {
        var updateObject = { hot: 'firebae' };
        it('should call update on the underlying ref', function () {
            var updateSpy = spyOn(ref, 'update');
            O.subscribe();
            O.update(updateObject);
            expect(updateSpy).toHaveBeenCalledWith(updateObject);
        });
        it('should throw an exception if updated when not subscribed', function () {
            O = new FirebaseObjectObservable(function (observer) { });
            expect(function () {
                O.update(updateObject);
            }).toThrowError('No ref specified for this Observable!');
        });
        it('should accept any type of value without compilation error', function () {
            O.update(updateObject);
        });
        it('should resolve returned thenable when successful', function (done) {
            O.update(updateObject).then(done, done.fail);
        });
    });
    describe('remove', function () {
        it('should call remove on the underlying ref', function () {
            var removeSpy = spyOn(ref, 'remove');
            O.subscribe();
            O.remove();
            expect(removeSpy).toHaveBeenCalledWith();
        });
        it('should throw an exception if removed when not subscribed', function () {
            O = new FirebaseObjectObservable(function (observer) { });
            expect(function () {
                O.remove();
            }).toThrowError('No ref specified for this Observable!');
        });
        it('should resolve returned thenable when successful', function (done) {
            O.remove().then(done, done.fail);
        });
    });
});
function noop() { }
//# sourceMappingURL=firebase_object_observable.spec.js.map