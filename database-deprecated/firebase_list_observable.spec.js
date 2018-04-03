import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { map } from 'rxjs/operator/map';
import { unwrapMapFn } from './utils';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
describe('FirebaseListObservable', function () {
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
            O = new FirebaseListObservable(ref, function (observer) {
            });
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
        ref.off();
        ref.remove(done);
    });
    it('should return an instance of FirebaseObservable when calling operators', function () {
        O = new FirebaseListObservable(ref, function (observer) {
        });
        expect(map.call(O, noop) instanceof FirebaseListObservable).toBe(true);
    });
    describe('$ref', function () {
        it('should match the database path passed in the constructor', function () {
            expect(O.$ref.toString()).toEqual(ref.toString());
        });
    });
    describe('push', function () {
        it('should throw an exception if pushed when not subscribed', function () {
            O = new FirebaseListObservable(null, function (observer) { });
            expect(function () {
                O.push('foo');
            }).toThrowError('No ref specified for this Observable!');
        });
        it('should resolve returned thenable when successful', function (done) {
            O.push('foo').then(done, done.fail);
        });
    });
    describe('remove', function () {
        var orphan = { orphan: true };
        var child;
        beforeEach(function () {
            child = ref.push(orphan);
        });
        it('should remove the item from the Firebase db when given the key', function (done) {
            var childAddedSpy = jasmine.createSpy('childAdded');
            ref.on('child_added', childAddedSpy);
            O.remove(child.key)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childAddedSpy.calls.argsFor(0)[0].val()).toEqual(orphan);
                expect(data.val()).toBeNull();
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should remove the item from the Firebase db when given the reference', function (done) {
            var childAddedSpy = jasmine.createSpy('childAdded');
            ref.on('child_added', childAddedSpy);
            O.remove(child)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childAddedSpy.calls.argsFor(0)[0].val()).toEqual(orphan);
                expect(data.val()).toBeNull();
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should remove the item from the Firebase db when given the snapshot', function (done) {
            ref.on('child_added', function (data) {
                expect(data.val()).toEqual(orphan);
                O.remove(data)
                    .then(function () { return ref.once('value'); })
                    .then(function (data) {
                    expect(data.val()).toBeNull();
                    ref.off();
                })
                    .then(done, done.fail);
            });
        });
        it('should remove the item from the Firebase db when given the unwrapped snapshot', function (done) {
            ref.on('child_added', function (data) {
                expect(data.val()).toEqual(orphan);
                O.remove(unwrapMapFn(data))
                    .then(function () { return ref.once('value'); })
                    .then(function (data) {
                    expect(data.val()).toBeNull();
                    ref.off();
                })
                    .then(done, done.fail);
            });
        });
        it('should remove the whole list if no item is added', function () {
            O.remove()
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(data.val()).toBe(null);
            });
        });
        it('should throw an exception if input is not supported', function () {
            var input = { lol: true };
            expect(function () { return O.remove(input); }).toThrowError("Method requires a key, snapshot, reference, or unwrapped snapshot. Got: " + typeof input);
        });
    });
    describe('set', function () {
        var orphan = { orphan: true };
        var child;
        beforeEach(function () {
            child = ref.push(orphan);
        });
        it('should set(replace) the item from the Firebase db when given the key', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.set(child.key, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).not.toEqual({
                    orphan: true,
                    changed: true
                });
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should set(replace) the item from the Firebase db when given the reference', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.set(child.ref, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).not.toEqual({
                    orphan: true,
                    changed: true
                });
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should set(replace) the item from the Firebase db when given the snapshot', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.set(child, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).not.toEqual({
                    orphan: true,
                    changed: true
                });
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should set(replace) the item from the Firebase db when given the unwrapped snapshot', function (done) {
            var orphanChange = { changed: true };
            ref.on('child_added', function (data) {
                expect(data.val()).toEqual(orphan);
                O.set(unwrapMapFn(data), orphanChange)
                    .then(function () { return child.once('value'); })
                    .then(function (data) {
                    expect(data.val()).not.toEqual({
                        orphan: true,
                        changed: true
                    });
                    expect(data.val()).toEqual({
                        changed: true
                    });
                    ref.off();
                })
                    .then(done, done.fail);
            });
        });
    });
    describe('update', function () {
        var orphan = { orphan: true };
        var child;
        beforeEach(function () {
            child = ref.push(orphan);
        });
        it('should update the item from the Firebase db when given the key', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.update(child.key, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    orphan: true,
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should update the item from the Firebase db when given the reference', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.update(child.ref, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    orphan: true,
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should update the item from the Firebase db when given the snapshot', function (done) {
            var childChangedSpy = jasmine.createSpy('childChanged');
            var orphanChange = { changed: true };
            ref.on('child_changed', childChangedSpy);
            O.update(child, orphanChange)
                .then(function () { return ref.once('value'); })
                .then(function (data) {
                expect(childChangedSpy.calls.argsFor(0)[0].val()).toEqual({
                    orphan: true,
                    changed: true
                });
                ref.off();
            })
                .then(done, done.fail);
        });
        it('should update the item from the Firebase db when given the unwrapped snapshot', function (done) {
            var orphanChange = { changed: true };
            ref.on('child_added', function (data) {
                expect(data.val()).toEqual(orphan);
                O.update(unwrapMapFn(data), orphanChange)
                    .then(function () { return child.once('value'); })
                    .then(function (data) {
                    expect(data.val()).toEqual({
                        orphan: true,
                        changed: true
                    });
                    ref.off();
                })
                    .then(done, done.fail);
            });
        });
    });
});
function noop() { }
//# sourceMappingURL=firebase_list_observable.spec.js.map