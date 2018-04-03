var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, stateChanges } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from '../test-config';
import 'rxjs/add/operator/skip';
var rando = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME = rando();
describe('stateChanges', function () {
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
    function prepareStateChanges(opts) {
        if (opts === void 0) { opts = { skip: 0 }; }
        var events = opts.events, skip = opts.skip;
        var aref = createRef(rando());
        aref.set(batch);
        var changes = stateChanges(aref, events);
        return {
            changes: changes.skip(skip),
            ref: aref
        };
    }
    it('should listen to all events by default', function (done) {
        var changes = prepareStateChanges({ skip: 2 }).changes;
        changes.subscribe(function (action) {
            expect(action.key).toEqual('2');
            expect(action.payload.val()).toEqual(items[items.length - 1]);
            done();
        });
    });
});
//# sourceMappingURL=state-changes.spec.js.map