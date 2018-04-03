var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, fromRef } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from '../test-config';
var rando = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME = rando();
describe('fromRef', function () {
    var app;
    var ref;
    var batch = {};
    var items = [{ name: 'one' }, { name: 'two' }, { name: 'three' }].map(function (item) { return (__assign({ key: rando() }, item)); });
    Object.keys(items).forEach(function (key) {
        var itemValue = items[key];
        batch[itemValue.key] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp], function (app_) {
            app = app_;
            app.database().goOffline();
            ref = function (path) { app.database().goOffline(); return app.database().ref(path); };
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    it('it should be async', function (done) {
        var itemRef = ref(rando());
        itemRef.set(batch);
        var obs = fromRef(itemRef, 'value');
        var count = 0;
        expect(count).toEqual(0);
        var sub = obs.subscribe(function (change) {
            count = count + 1;
            expect(count).toEqual(1);
            done();
            sub.unsubscribe();
        });
        expect(count).toEqual(0);
    });
    it('it should should handle non-existence', function (done) {
        var itemRef = ref(rando());
        itemRef.set({});
        var obs = fromRef(itemRef, 'value');
        var sub = obs.take(1).subscribe(function (change) {
            expect(change.payload.exists()).toEqual(false);
            expect(change.payload.val()).toEqual(null);
        }).add(done);
    });
    it('once should complete', function (done) {
        var itemRef = ref(rando());
        itemRef.set(batch);
        var obs = fromRef(itemRef, 'value', 'once');
        obs.subscribe(function (change) { }, function () { }, done);
    });
    it('it should listen and then unsubscribe', function (done) {
        var itemRef = ref(rando());
        itemRef.set(batch);
        var obs = fromRef(itemRef, 'value');
        var count = 0;
        var sub = obs.subscribe(function (change) {
            count = count + 1;
            expect(count).toEqual(1);
            done();
            sub.unsubscribe();
            itemRef.push({ name: 'anotha one' });
        });
    });
    describe('events', function () {
        it('should stream back a child_added event', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var itemRef, obs, count, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = fromRef(itemRef, 'child_added');
                count = 0;
                sub = obs.subscribe(function (change) {
                    count = count + 1;
                    var type = change.type, payload = change.payload;
                    expect(type).toEqual('child_added');
                    expect(payload.val()).toEqual(batch[payload.key]);
                    if (count === items.length) {
                        done();
                        sub.unsubscribe();
                        expect(sub.closed).toEqual(true);
                    }
                });
                return [2];
            });
        }); });
        it('should stream back a child_changed event', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var itemRef, obs, name, key, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = fromRef(itemRef, 'child_changed');
                name = 'look at what you made me do';
                key = items[0].key;
                sub = obs.subscribe(function (change) {
                    var type = change.type, payload = change.payload;
                    expect(type).toEqual('child_changed');
                    expect(payload.key).toEqual(key);
                    expect(payload.val()).toEqual({ key: key, name: name });
                    sub.unsubscribe();
                    done();
                });
                itemRef.child(key).update({ name: name });
                return [2];
            });
        }); });
        it('should stream back a child_removed event', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var itemRef, obs, key, name, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = fromRef(itemRef, 'child_removed');
                key = items[0].key;
                name = items[0].name;
                sub = obs.subscribe(function (change) {
                    var type = change.type, payload = change.payload;
                    expect(type).toEqual('child_removed');
                    expect(payload.key).toEqual(key);
                    expect(payload.val()).toEqual({ key: key, name: name });
                    sub.unsubscribe();
                    done();
                });
                itemRef.child(key).remove();
                return [2];
            });
        }); });
        it('should stream back a child_moved event', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var itemRef, obs, key, name, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = fromRef(itemRef, 'child_moved');
                key = items[2].key;
                name = items[2].name;
                sub = obs.subscribe(function (change) {
                    var type = change.type, payload = change.payload;
                    expect(type).toEqual('child_moved');
                    expect(payload.key).toEqual(key);
                    expect(payload.val()).toEqual({ key: key, name: name });
                    sub.unsubscribe();
                    done();
                });
                itemRef.child(key).setPriority(-100, function () { });
                return [2];
            });
        }); });
        it('should stream back a value event', function (done) {
            var itemRef = ref(rando());
            itemRef.set(batch);
            var obs = fromRef(itemRef, 'value');
            var sub = obs.subscribe(function (change) {
                var type = change.type, payload = change.payload;
                expect(type).toEqual('value');
                expect(payload.val()).toEqual(batch);
                done();
                sub.unsubscribe();
                expect(sub.closed).toEqual(true);
            });
        });
        it('should stream back query results', function (done) {
            var itemRef = ref(rando());
            itemRef.set(batch);
            var query = itemRef.orderByChild('name').equalTo(items[0].name);
            var obs = fromRef(query, 'value');
            var sub = obs.subscribe(function (change) {
                var child;
                change.payload.forEach(function (snap) { child = snap.val(); return true; });
                expect(child).toEqual(items[0]);
                done();
            });
        });
    });
});
//# sourceMappingURL=fromRef.spec.js.map