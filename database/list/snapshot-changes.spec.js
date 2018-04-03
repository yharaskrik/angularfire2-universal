var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, snapshotChanges } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from '../test-config';
import 'rxjs/add/operator/skip';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var rando = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME = rando();
describe('snapshotChanges', function () {
    var app;
    var db;
    var createRef;
    var batch = {};
    var items = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }].map(function (item, i) { return (__assign({ key: i.toString() }, item)); });
    Object.keys(items).forEach(function (key, i) {
        var itemValue = items[key];
        batch[i] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
            app.database().goOffline();
            createRef = function (path) { app.database().goOffline(); return app.database().ref(path); };
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    function prepareSnapshotChanges(opts) {
        if (opts === void 0) { opts = { skip: 0 }; }
        var events = opts.events, skip = opts.skip;
        var aref = createRef(rando());
        var snapChanges = snapshotChanges(aref, events);
        return {
            snapChanges: snapChanges.skip(skip),
            ref: aref
        };
    }
    it('should listen to all events by default', function (done) {
        var _a = prepareSnapshotChanges(), snapChanges = _a.snapChanges, ref = _a.ref;
        snapChanges.take(1).subscribe(function (actions) {
            var data = actions.map(function (a) { return a.payload.val(); });
            expect(data).toEqual(items);
        }).add(done);
        ref.set(batch);
    });
    it('should handle multiple subscriptions (hot)', function (done) {
        var _a = prepareSnapshotChanges(), snapChanges = _a.snapChanges, ref = _a.ref;
        var sub = snapChanges.subscribe(function () { }).add(done);
        snapChanges.take(1).subscribe(function (actions) {
            var data = actions.map(function (a) { return a.payload.val(); });
            expect(data).toEqual(items);
        }).add(sub);
        ref.set(batch);
    });
    it('should handle multiple subscriptions (warm)', function (done) {
        var _a = prepareSnapshotChanges(), snapChanges = _a.snapChanges, ref = _a.ref;
        snapChanges.take(1).subscribe(function () { }).add(function () {
            snapChanges.take(1).subscribe(function (actions) {
                var data = actions.map(function (a) { return a.payload.val(); });
                expect(data).toEqual(items);
            }).add(done);
        });
        ref.set(batch);
    });
    it('should listen to only child_added events', function (done) {
        var _a = prepareSnapshotChanges({ events: ['child_added'], skip: 0 }), snapChanges = _a.snapChanges, ref = _a.ref;
        snapChanges.take(1).subscribe(function (actions) {
            var data = actions.map(function (a) { return a.payload.val(); });
            expect(data).toEqual(items);
        }).add(done);
        ref.set(batch);
    });
    it('should listen to only child_added, child_changed events', function (done) {
        var _a = prepareSnapshotChanges({
            events: ['child_added', 'child_changed'],
            skip: 1
        }), snapChanges = _a.snapChanges, ref = _a.ref;
        var name = 'ligatures';
        snapChanges.take(1).subscribe(function (actions) {
            var data = actions.map(function (a) { return a.payload.val(); });
            ;
            var copy = items.slice();
            copy[0].name = name;
            expect(data).toEqual(copy);
        }).add(done);
        app.database().goOnline();
        ref.set(batch).then(function () {
            ref.child(items[0].key).update({ name: name });
        });
    });
    it('should handle empty sets', function (done) {
        var aref = createRef(rando());
        aref.set({});
        snapshotChanges(aref).take(1).subscribe(function (data) {
            expect(data.length).toEqual(0);
        }).add(done);
    });
    it('should handle dynamic queries that return empty sets', function (done) {
        var ITEMS = 10;
        var count = 0;
        var firstIndex = 0;
        var namefilter$ = new BehaviorSubject(null);
        var aref = createRef(rando());
        aref.set(batch);
        namefilter$.switchMap(function (name) {
            var filteredRef = name ? aref.child('name').equalTo(name) : aref;
            return snapshotChanges(filteredRef);
        }).take(2).subscribe(function (data) {
            count = count + 1;
            if (count === 1) {
                expect(Object.keys(data).length).toEqual(3);
                namefilter$.next(-1);
            }
            if (count === 2) {
                expect(Object.keys(data).length).toEqual(0);
            }
        }).add(done);
    });
});
//# sourceMappingURL=snapshot-changes.spec.js.map