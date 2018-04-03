(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core/testing'), require('@angular/core'), require('angularfire2'), require('@angular/platform-browser'), require('rxjs/Subject'), require('rxjs/operator/take'), require('rxjs/operator/skip'), require('angularfire2/auth'), require('rxjs/observable/from'), require('rxjs/observable/of'), require('rxjs/add/operator/map'), require('rxjs/add/operator/catch'), require('rxjs/Observable'), require('rxjs/add/operator/share'), require('rxjs/add/operator/filter'), require('rxjs/add/operator/scan'), require('rxjs/add/observable/of'), require('@firebase/firestore'), require('rxjs/BehaviorSubject'), require('rxjs/add/operator/skip'), require('angularfire2/database'), require('rxjs/observable/forkJoin'), require('angularfire2/storage')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core/testing', '@angular/core', 'angularfire2', '@angular/platform-browser', 'rxjs/Subject', 'rxjs/operator/take', 'rxjs/operator/skip', 'angularfire2/auth', 'rxjs/observable/from', 'rxjs/observable/of', 'rxjs/add/operator/map', 'rxjs/add/operator/catch', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/filter', 'rxjs/add/operator/scan', 'rxjs/add/observable/of', '@firebase/firestore', 'rxjs/BehaviorSubject', 'rxjs/add/operator/skip', 'angularfire2/database', 'rxjs/observable/forkJoin', 'angularfire2/storage'], factory) :
    (factory((global.angularfire2 = global.angularfire2 || {}, global.angularfire2.test = global.angularfire2.test || {}),global.ng.core.testing,global.ng.core,global.angularfire2,global.ng.platformBrowser,global.Rx,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.angularfire2.auth,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.firebase,global.Rx,global.Rx.Observable.prototype,global.angularfire2.database,global.Rx.Observable,global.angularfire2.storage));
}(this, (function (exports,_angular_core_testing,_angular_core,angularfire2,_angular_platformBrowser,rxjs_Subject,rxjs_operator_take,rxjs_operator_skip,angularfire2_auth,rxjs_observable_from,rxjs_observable_of,rxjs_add_operator_map,rxjs_add_operator_catch,rxjs_Observable,rxjs_add_operator_share,rxjs_add_operator_filter,rxjs_add_operator_scan,rxjs_add_observable_of,_firebase_firestore,rxjs_BehaviorSubject,rxjs_add_operator_skip,angularfire2_database,rxjs_observable_forkJoin,angularfire2_storage) { 'use strict';

var COMMON_CONFIG = {
    apiKey: "AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA",
    authDomain: "angularfire2-test.firebaseapp.com",
    databaseURL: "https://angularfire2-test.firebaseio.com",
    storageBucket: "angularfire2-test.appspot.com",
};

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
describe('angularfire', function () {
    var subscription;
    var app;
    var rootRef;
    var questionsRef;
    var listOfQuestionsRef;
    var defaultPlatform;
    var APP_NAME = 'super-awesome-test-firebase-app-name';
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG, APP_NAME)]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, _angular_core.PlatformRef], function (_app, _platform) {
            app = _app;
            rootRef = app.database().ref();
            questionsRef = rootRef.child('questions');
            listOfQuestionsRef = rootRef.child('list-of-questions');
            defaultPlatform = _platform;
        })();
    });
    afterEach(function (done) {
        rootRef.remove();
        if (subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
        app.delete().then(done, done.fail);
    });
    describe('FirebaseApp', function () {
        it('should provide a FirebaseApp for the FirebaseApp binding', function () {
            expect(typeof app.delete).toBe('function');
        });
        it('should have the provided name', function () {
            expect(app.name).toBe(APP_NAME);
        });
        it('should use an already intialized firebase app if it exists', function (done) {
            var MyModule = (function () {
                function MyModule() {
                }
                MyModule.prototype.ngDoBootstrap = function () { };
                MyModule = __decorate([
                    _angular_core.NgModule({
                        imports: [
                            angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG, APP_NAME),
                            _angular_platformBrowser.BrowserModule
                        ]
                    })
                ], MyModule);
                return MyModule;
            }());
            var compilerFactory = defaultPlatform.injector.get(_angular_core.CompilerFactory, null);
            var moduleFactory = compilerFactory.createCompiler().compileModuleSync(MyModule);
            defaultPlatform.bootstrapModuleFactory(moduleFactory)
                .then(function (moduleRef) {
                var ref = moduleRef.injector.get(angularfire2.FirebaseApp);
                expect(ref.name).toEqual(app.name);
            }).then(done, function (e) {
                fail(e);
                done();
            });
        });
    });
});

var COMMON_CONFIG$1 = {
    apiKey: "AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA",
    authDomain: "angularfire2-test.firebaseapp.com",
    databaseURL: "https://angularfire2-test.firebaseio.com",
    storageBucket: "angularfire2-test.appspot.com",
};

var firebaseUser = {
    uid: '12345',
    providerData: [{ displayName: 'jeffbcrossyface' }]
};
describe('AngularFireAuth', function () {
    var app;
    var afAuth;
    var authSpy;
    var mockAuthState;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$1),
                angularfire2_auth.AngularFireAuthModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_auth.AngularFireAuth], function (app_, _auth) {
            app = app_;
            afAuth = _auth;
        })();
        mockAuthState = new rxjs_Subject.Subject();
        spyOn(afAuth, 'authState').and.returnValue(mockAuthState);
        spyOn(afAuth, 'idToken').and.returnValue(mockAuthState);
        afAuth.authState = mockAuthState;
        afAuth.idToken = mockAuthState;
    });
    afterEach(function (done) {
        afAuth.auth.app.delete().then(done, done.fail);
    });
    describe('Zones', function () {
        it('should call operators and subscriber in the same zone as when service was initialized', function (done) {
            var ngZone = Zone.current.fork({
                name: 'ngZone'
            });
            ngZone.run(function () {
                var subs = [
                    afAuth.authState.subscribe(function (user) {
                        expect(Zone.current.name).toBe('ngZone');
                        done();
                    }, done.fail),
                    afAuth.authState.subscribe(function (user) {
                        expect(Zone.current.name).toBe('ngZone');
                        done();
                    }, done.fail)
                ];
                mockAuthState.next(firebaseUser);
                subs.forEach(function (s) { return s.unsubscribe(); });
            });
        });
    });
    it('should be exist', function () {
        expect(afAuth instanceof angularfire2_auth.AngularFireAuth).toBe(true);
    });
    it('should have the Firebase Auth instance', function () {
        expect(afAuth.auth).toBeDefined();
    });
    it('should have an initialized Firebase app', function () {
        expect(afAuth.auth.app).toBeDefined();
        expect(afAuth.auth.app).toEqual(app);
    });
    it('should emit auth updates through authState', function (done) {
        var count = 0;
        var subs = afAuth.authState.subscribe(function (user) {
            if (count === 0) {
                expect(user).toBe(null);
                count = count + 1;
                mockAuthState.next(firebaseUser);
            }
            else {
                expect(user).toEqual(firebaseUser);
                subs.unsubscribe();
                done();
            }
        }, done, done.fail);
        mockAuthState.next(null);
    });
    it('should emit auth updates through idToken', function (done) {
        var count = 0;
        var subs = afAuth.idToken.subscribe(function (user) {
            if (count === 0) {
                expect(user).toBe(null);
                count = count + 1;
                mockAuthState.next(firebaseUser);
            }
            else {
                expect(user).toEqual(firebaseUser);
                subs.unsubscribe();
                done();
            }
        }, done, done.fail);
        mockAuthState.next(null);
    });
});
var FIREBASE_APP_NAME_TOO = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireAuth with different app', function () {
    var app;
    var afAuth;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$1),
                angularfire2_auth.AngularFireAuthModule
            ],
            providers: [
                { provide: angularfire2.FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO },
                { provide: angularfire2.FirebaseAppConfig, useValue: COMMON_CONFIG$1 }
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_auth.AngularFireAuth], function (app_, _afAuth) {
            app = app_;
            afAuth = _afAuth;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should be an AngularFireAuth type', function () {
            expect(afAuth instanceof angularfire2_auth.AngularFireAuth).toEqual(true);
        });
        it('should have an initialized Firebase app', function () {
            expect(afAuth.auth.app).toBeDefined();
            expect(afAuth.auth.app).toEqual(app);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(afAuth.auth.app.name).toEqual(FIREBASE_APP_NAME_TOO);
        });
    });
});

function _fromRef(ref) {
    return new rxjs_Observable.Observable(function (subscriber) {
        var unsubscribe = ref.onSnapshot(subscriber);
        return { unsubscribe: unsubscribe };
    });
}
function fromRef$1(ref) {
    return _fromRef(ref).share();
}
function fromDocRef(ref) {
    return fromRef$1(ref)
        .map(function (payload) { return ({ payload: payload, type: 'value' }); });
}
function fromCollectionRef(ref) {
    return fromRef$1(ref).map(function (payload) { return ({ payload: payload, type: 'query' }); });
}

function docChanges(query) {
    return fromCollectionRef(query)
        .map(function (action) {
        return action.payload.docChanges
            .map(function (change) { return ({ type: change.type, payload: change }); });
    });
}
function sortedChanges(query, events) {
    return fromCollectionRef(query)
        .map(function (changes) { return changes.payload.docChanges; })
        .scan(function (current, changes) { return combineChanges(current, changes, events); }, [])
        .map(function (changes) { return changes.map(function (c) { return ({ type: c.type, payload: c }); }); });
}
function combineChanges(current, changes, events) {
    changes.forEach(function (change) {
        if (events.indexOf(change.type) > -1) {
            current = combineChange(current, change);
        }
    });
    return current;
}
function combineChange(combined, change) {
    switch (change.type) {
        case 'added':
            if (combined[change.newIndex] && combined[change.newIndex].doc.id == change.doc.id) {
            }
            else {
                combined.splice(change.newIndex, 0, change);
            }
            break;
        case 'modified':
            if (change.oldIndex !== change.newIndex) {
                combined.splice(change.oldIndex, 1);
                combined.splice(change.newIndex, 0, change);
            }
            else {
                combined.splice(change.newIndex, 1, change);
            }
            break;
        case 'removed':
            combined.splice(change.oldIndex, 1);
            break;
    }
    return combined;
}

function validateEventsArray(events) {
    if (!events || events.length === 0) {
        events = ['added', 'removed', 'modified'];
    }
    return events;
}
var AngularFirestoreCollection = (function () {
    function AngularFirestoreCollection(ref, query, afs) {
        this.ref = ref;
        this.query = query;
        this.afs = afs;
    }
    AngularFirestoreCollection.prototype.stateChanges = function (events) {
        if (!events || events.length === 0) {
            return docChanges(this.query);
        }
        return this.afs.scheduler.keepUnstableUntilFirst(docChanges(this.query)
            .map(function (actions) { return actions.filter(function (change) { return events.indexOf(change.type) > -1; }); })
            .filter(function (changes) { return changes.length > 0; }));
    };
    AngularFirestoreCollection.prototype.auditTrail = function (events) {
        return this.stateChanges(events).scan(function (current, action) { return current.concat(action); }, []);
    };
    AngularFirestoreCollection.prototype.snapshotChanges = function (events) {
        var validatedEvents = validateEventsArray(events);
        var sortedChanges$ = sortedChanges(this.query, validatedEvents);
        var scheduledSortedChanges$ = this.afs.scheduler.runOutsideAngular(sortedChanges$);
        return this.afs.scheduler.keepUnstableUntilFirst(scheduledSortedChanges$);
    };
    AngularFirestoreCollection.prototype.valueChanges = function () {
        var fromCollectionRef$ = fromCollectionRef(this.query);
        var scheduled$ = this.afs.scheduler.runOutsideAngular(fromCollectionRef$);
        return this.afs.scheduler.keepUnstableUntilFirst(scheduled$)
            .map(function (actions) { return actions.payload.docs.map(function (a) { return a.data(); }); });
    };
    AngularFirestoreCollection.prototype.add = function (data) {
        return this.ref.add(data);
    };
    AngularFirestoreCollection.prototype.doc = function (path) {
        return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
    };
    return AngularFirestoreCollection;
}());

var AngularFirestoreDocument = (function () {
    function AngularFirestoreDocument(ref, afs) {
        this.ref = ref;
        this.afs = afs;
    }
    AngularFirestoreDocument.prototype.set = function (data, options) {
        return this.ref.set(data, options);
    };
    AngularFirestoreDocument.prototype.update = function (data) {
        return this.ref.update(data);
    };
    AngularFirestoreDocument.prototype.delete = function () {
        return this.ref.delete();
    };
    AngularFirestoreDocument.prototype.collection = function (path, queryFn) {
        var collectionRef = this.ref.collection(path);
        var _a = associateQuery(collectionRef, queryFn), ref = _a.ref, query = _a.query;
        return new AngularFirestoreCollection(ref, query, this.afs);
    };
    AngularFirestoreDocument.prototype.snapshotChanges = function () {
        var fromDocRef$ = fromDocRef(this.ref);
        var scheduledFromDocRef$ = this.afs.scheduler.runOutsideAngular(fromDocRef$);
        return this.afs.scheduler.keepUnstableUntilFirst(scheduledFromDocRef$);
    };
    AngularFirestoreDocument.prototype.valueChanges = function () {
        return this.snapshotChanges().map(function (action) {
            return action.payload.exists ? action.payload.data() : null;
        });
    };
    return AngularFirestoreDocument;
}());

var EnablePersistenceToken = new _angular_core.InjectionToken('angularfire2.enableFirestorePersistence');
function associateQuery(collectionRef, queryFn) {
    if (queryFn === void 0) { queryFn = function (ref) { return ref; }; }
    var query = queryFn(collectionRef);
    var ref = collectionRef;
    return { query: query, ref: ref };
}
var AngularFirestore = (function () {
    function AngularFirestore(config, name, shouldEnablePersistence, zone) {
        var _this = this;
        this.scheduler = new angularfire2.FirebaseZoneScheduler(zone);
        this.firestore = zone.runOutsideAngular(function () {
            var app = angularfire2._firebaseAppFactory(config, name);
            return app.firestore();
        });
        this.persistenceEnabled$ = zone.runOutsideAngular(function () {
            return shouldEnablePersistence ? rxjs_observable_from.from(_this.firestore.enablePersistence().then(function () { return true; }, function () { return false; }))
                : rxjs_observable_of.of(false);
        })
            .catch(function () { return rxjs_observable_of.of(false); });
    }
    AngularFirestore.prototype.collection = function (pathOrRef, queryFn) {
        var collectionRef;
        if (typeof pathOrRef === 'string') {
            collectionRef = this.firestore.collection(pathOrRef);
        }
        else {
            collectionRef = pathOrRef;
        }
        var _a = associateQuery(collectionRef, queryFn), ref = _a.ref, query = _a.query;
        return new AngularFirestoreCollection(ref, query, this);
    };
    AngularFirestore.prototype.doc = function (pathOrRef) {
        var ref;
        if (typeof pathOrRef === 'string') {
            ref = this.firestore.doc(pathOrRef);
        }
        else {
            ref = pathOrRef;
        }
        return new AngularFirestoreDocument(ref, this);
    };
    AngularFirestore.prototype.createId = function () {
        return this.firestore.collection('_').doc().id;
    };
    AngularFirestore.decorators = [
        { type: _angular_core.Injectable },
    ];
    AngularFirestore.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [angularfire2.FirebaseAppConfig,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [angularfire2.FirebaseAppName,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [EnablePersistenceToken,] },] },
        { type: _angular_core.NgZone, },
    ]; };
    return AngularFirestore;
}());

var AngularFirestoreModule = (function () {
    function AngularFirestoreModule() {
    }
    AngularFirestoreModule.enablePersistence = function () {
        return {
            ngModule: AngularFirestoreModule,
            providers: [
                { provide: EnablePersistenceToken, useValue: true },
            ]
        };
    };
    AngularFirestoreModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [AngularFirestore]
                },] },
    ];
    AngularFirestoreModule.ctorParameters = function () { return []; };
    return AngularFirestoreModule;
}());

const COMMON_CONFIG$2 = {
    apiKey: "AIzaSyAwRrxjjft7KMdhwfLKPkd8PCBR3JFaLfo",
    authDomain: "angularfirestore.firebaseapp.com",
    databaseURL: "https://angularfirestore.firebaseio.com",
    projectId: "angularfirestore",
    storageBucket: "angularfirestore.appspot.com",
    messagingSenderId: "1039984584356"
};

describe('AngularFirestore', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$2),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach(done => {
        app.delete();
        done();
    });
    it('should be the properly initialized type', () => {
        expect(afs instanceof AngularFirestore).toBe(true);
    });
    it('should have an initialized Firebase app', () => {
        expect(afs.firestore.app).toBeDefined();
        expect(afs.firestore.app).toEqual(app);
    });
    it('should create an AngularFirestoreDocument from a string path', () => {
        const doc = afs.doc('a/doc');
        expect(doc instanceof AngularFirestoreDocument).toBe(true);
    });
    it('should create an AngularFirestoreDocument from a string path', () => {
        const ref = afs.doc('a/doc').ref;
        const doc = afs.doc(ref);
        expect(doc instanceof AngularFirestoreDocument).toBe(true);
    });
    it('should create an AngularFirestoreCollection from a string path', () => {
        const collection = afs.collection('stuffs');
        expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });
    it('should create an AngularFirestoreCollection from a reference', () => {
        const ref = afs.collection('stuffs').ref;
        const collection = afs.collection(ref);
        expect(collection instanceof AngularFirestoreCollection).toBe(true);
    });
    it('should throw on an invalid document path', () => {
        const singleWrapper = () => afs.doc('collection');
        const tripleWrapper = () => afs.doc('collection/doc/subcollection');
        expect(singleWrapper).toThrowError();
        expect(tripleWrapper).toThrowError();
    });
    it('should throw on an invalid collection path', () => {
        const singleWrapper = () => afs.collection('collection/doc');
        const quadWrapper = () => afs.collection('collection/doc/subcollection/doc');
        expect(singleWrapper).toThrowError();
        expect(quadWrapper).toThrowError();
    });
    it('should enable persistence', (done) => {
        const sub = afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(true);
            done();
        });
    });
});
const FIREBASE_APP_NAME_TOO$1 = (Math.random() + 1).toString(36).substring(7);
describe('AngularFirestore with different app', () => {
    let app;
    let afs;
    beforeEach(() => {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$2),
                AngularFirestoreModule
            ],
            providers: [
                { provide: angularfire2.FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO$1 },
                { provide: angularfire2.FirebaseAppConfig, useValue: COMMON_CONFIG$2 }
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, AngularFirestore], (app_, _afs) => {
            app = app_;
            afs = _afs;
        })();
    });
    afterEach(done => {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', () => {
        it('should be an AngularFirestore type', () => {
            expect(afs instanceof AngularFirestore).toEqual(true);
        });
        it('should have an initialized Firebase app', () => {
            expect(afs.firestore.app).toBeDefined();
            expect(afs.firestore.app).toEqual(app);
        });
        it('should have an initialized Firebase app instance member', () => {
            expect(afs.firestore.app.name).toEqual(FIREBASE_APP_NAME_TOO$1);
        });
    });
});
describe('AngularFirestore without persistance', () => {
    let app;
    let afs;
    beforeEach(() => {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$2),
                AngularFirestoreModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    it('should not enable persistence', (done) => {
        afs.persistenceEnabled$.subscribe(isEnabled => {
            expect(isEnabled).toBe(false);
            done();
        });
    });
});

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const FAKE_STOCK_DATA = { name: 'FAKE', price: 1 };
const randomName = (firestore) => firestore.collection('a').doc().id;
const createRandomStocks = (firestore, collectionRef, numberOfItems) => __awaiter$1(undefined, void 0, void 0, function* () {
    const batch = firestore.batch();
    let count = 0;
    let names = [];
    Array.from(Array(numberOfItems)).forEach((a, i) => {
        const name = randomName(firestore);
        batch.set(collectionRef.doc(name), FAKE_STOCK_DATA);
        names = [...names, name];
    });
    yield batch.commit();
    return names;
});
function deleteThemAll(names, ref) {
    const promises = names.map(name => ref.doc(name).delete());
    return Promise.all(promises);
}
function delayUpdate(collection, path, data, delay = 250) {
    setTimeout(() => {
        collection.doc(path).update(data);
    }, delay);
}
function delayAdd(collection, path, data, delay = 250) {
    setTimeout(() => {
        collection.doc(path).set(data);
    }, delay);
}
function delayDelete(collection, path, delay = 250) {
    setTimeout(() => {
        collection.doc(path).delete();
    }, delay);
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('AngularFirestoreDocument', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$2),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach((done) => __awaiter(undefined, void 0, void 0, function* () {
        yield app.delete();
        done();
    }));
    it('should get action updates', (done) => __awaiter(undefined, void 0, void 0, function* () {
        const randomCollectionName = randomName(afs.firestore);
        const ref = afs.firestore.doc(`${randomCollectionName}/FAKE`);
        const stock = new AngularFirestoreDocument(ref, afs);
        yield stock.set(FAKE_STOCK_DATA);
        const sub = stock
            .snapshotChanges()
            .subscribe((a) => __awaiter(this, void 0, void 0, function* () {
            sub.unsubscribe();
            if (a.payload.exists) {
                expect(a.payload.data()).toEqual(FAKE_STOCK_DATA);
                stock.delete().then(done).catch(done.fail);
            }
        }));
    }));
    it('should get unwrapped snapshot', (done) => __awaiter(undefined, void 0, void 0, function* () {
        const randomCollectionName = afs.firestore.collection('a').doc().id;
        const ref = afs.firestore.doc(`${randomCollectionName}/FAKE`);
        const stock = new AngularFirestoreDocument(ref, afs);
        yield stock.set(FAKE_STOCK_DATA);
        const obs$ = stock.valueChanges();
        obs$.take(1).subscribe((data) => __awaiter(this, void 0, void 0, function* () {
            expect(JSON.stringify(data)).toBe(JSON.stringify(FAKE_STOCK_DATA));
            stock.delete().then(done).catch(done.fail);
        }));
    }));
});

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function collectionHarness(afs, items, queryFn) {
    return __awaiter$2(this, void 0, void 0, function* () {
        const randomCollectionName = randomName(afs.firestore);
        const ref = afs.firestore.collection(`${randomCollectionName}`);
        if (!queryFn) {
            queryFn = (ref) => ref;
        }
        const stocks = new AngularFirestoreCollection(ref, queryFn(ref), afs);
        let names = yield createRandomStocks(afs.firestore, ref, items);
        return { randomCollectionName, ref, stocks, names };
    });
}
describe('AngularFirestoreCollection', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$2),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach((done) => __awaiter$2(undefined, void 0, void 0, function* () {
        yield app.delete();
        done();
    }));
    describe('valueChanges()', () => {
        it('should get unwrapped snapshot', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.valueChanges().subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(ITEMS);
                data.forEach(stock => {
                    expect(stock).toEqual(FAKE_STOCK_DATA);
                });
                const promises = names.map(name => ref.doc(name).delete());
                Promise.all(promises).then(done).catch(fail);
            });
        }));
        it('should handle multiple subscriptions (hot)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.valueChanges();
            const sub = changes.subscribe(() => { }).add(changes.take(1).subscribe(data => {
                expect(data.length).toEqual(ITEMS);
                sub.unsubscribe();
            })).add(() => {
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
        }));
        it('should handle multiple subscriptions (warm)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.valueChanges();
            changes.take(1).subscribe(() => { }).add(() => {
                const sub = changes.take(1).subscribe(data => {
                    expect(data.length).toEqual(ITEMS);
                }).add(() => {
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                });
            });
        }));
        it('should handle dynamic queries that return empty sets', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            let firstIndex = 0;
            let pricefilter$ = new rxjs_BehaviorSubject.BehaviorSubject(null);
            const randomCollectionName = randomName(afs.firestore);
            const ref = afs.firestore.collection(`${randomCollectionName}`);
            let names = yield createRandomStocks(afs.firestore, ref, ITEMS);
            const sub = pricefilter$.switchMap(price => {
                return afs.collection(randomCollectionName, ref => price ? ref.where('price', '==', price) : ref).valueChanges();
            }).subscribe(data => {
                count = count + 1;
                if (count === 1) {
                    expect(data.length).toEqual(ITEMS);
                    pricefilter$.next(-1);
                }
                if (count === 2) {
                    expect(data.length).toEqual(0);
                    sub.unsubscribe();
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                }
            });
        }));
    });
    describe('snapshotChanges()', () => {
        it('should listen to all snapshotChanges() by default', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.snapshotChanges().subscribe(data => {
                const ids = data.map(d => d.payload.doc.id);
                count = count + 1;
                if (count === 1) {
                    stocks.doc(names[0]).update({ price: 2 });
                }
                if (count === 2) {
                    expect(data.length).toEqual(ITEMS);
                    const change = data.filter(x => x.payload.doc.id === names[0])[0];
                    expect(change.type).toEqual('modified');
                    sub.unsubscribe();
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                }
            });
        }));
        it('should handle multiple subscriptions (hot)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.snapshotChanges();
            const sub = changes.subscribe(() => { }).add(changes.take(1).subscribe(data => {
                expect(data.length).toEqual(ITEMS);
                sub.unsubscribe();
            })).add(() => {
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
        }));
        it('should handle multiple subscriptions (warm)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.snapshotChanges();
            changes.take(1).subscribe(() => { }).add(() => {
                const sub = changes.take(1).subscribe(data => {
                    expect(data.length).toEqual(ITEMS);
                }).add(() => {
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                });
            });
        }));
        it('should update order on queries', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            let firstIndex = 0;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS, ref => ref.orderBy('price', 'desc'));
            const sub = stocks.snapshotChanges().subscribe(data => {
                count = count + 1;
                if (count === 1) {
                    firstIndex = data.filter(d => d.payload.doc.id === names[0])[0].payload.newIndex;
                    stocks.doc(names[0]).update({ price: 2 });
                }
                if (count === 2) {
                    expect(data.length).toEqual(ITEMS);
                    const change = data.filter(x => x.payload.doc.id === names[0])[0];
                    expect(change.type).toEqual('modified');
                    expect(change.payload.oldIndex).toEqual(firstIndex);
                    sub.unsubscribe();
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                }
            });
        }));
        it('should be able to filter snapshotChanges() types - modified', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.snapshotChanges(['modified']).skip(1).subscribe(data => {
                sub.unsubscribe();
                const change = data.filter(x => x.payload.doc.id === names[0])[0];
                expect(data.length).toEqual(1);
                expect(change.payload.doc.data().price).toEqual(2);
                expect(change.type).toEqual('modified');
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
            delayUpdate(stocks, names[0], { price: 2 });
        }));
        it('should be able to filter snapshotChanges() types - added', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const nextId = ref.doc('a').id;
            const sub = stocks.snapshotChanges(['added']).skip(1).subscribe(data => {
                sub.unsubscribe();
                const change = data.filter(x => x.payload.doc.id === nextId)[0];
                expect(data.length).toEqual(ITEMS + 1);
                expect(change.payload.doc.data().price).toEqual(2);
                expect(change.type).toEqual('added');
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            names = names.concat([nextId]);
            delayAdd(stocks, nextId, { price: 2 });
        }));
        it('should be able to filter snapshotChanges() types - added/modified', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const nextId = ref.doc('a').id;
            let count = 0;
            const sub = stocks.snapshotChanges(['added', 'modified']).skip(1).take(2).subscribe(data => {
                count += 1;
                if (count == 1) {
                    const change = data.filter(x => x.payload.doc.id === nextId)[0];
                    expect(data.length).toEqual(ITEMS + 1);
                    expect(change.payload.doc.data().price).toEqual(2);
                    expect(change.type).toEqual('added');
                    delayUpdate(stocks, names[0], { price: 2 });
                }
                if (count == 2) {
                    const change = data.filter(x => x.payload.doc.id === names[0])[0];
                    expect(data.length).toEqual(ITEMS + 1);
                    expect(change.payload.doc.data().price).toEqual(2);
                    expect(change.type).toEqual('modified');
                }
            }).add(() => {
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
            names = names.concat([nextId]);
            delayAdd(stocks, nextId, { price: 2 });
        }));
        it('should be able to filter snapshotChanges() types - removed', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.snapshotChanges(['added', 'removed']).skip(1).subscribe(data => {
                sub.unsubscribe();
                const change = data.filter(x => x.payload.doc.id === names[0]);
                expect(data.length).toEqual(ITEMS - 1);
                expect(change.length).toEqual(0);
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            delayDelete(stocks, names[0], 400);
        }));
    });
    describe('stateChanges()', () => {
        it('should get stateChanges() updates', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.stateChanges().subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(ITEMS);
                data.forEach(action => {
                    expect(action.payload.doc.data()).toEqual(FAKE_STOCK_DATA);
                });
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
        }));
        it('should listen to all stateChanges() by default', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.stateChanges().subscribe(data => {
                count = count + 1;
                if (count === 1) {
                    stocks.doc(names[0]).update({ price: 2 });
                }
                if (count === 2) {
                    expect(data.length).toEqual(1);
                    expect(data[0].type).toEqual('modified');
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                }
            });
        }));
        it('should handle multiple subscriptions (hot)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.stateChanges();
            const sub = changes.subscribe(() => { }).add(changes.take(1).subscribe(data => {
                expect(data.length).toEqual(ITEMS);
                sub.unsubscribe();
            })).add(() => {
                deleteThemAll(names, ref).then(done).catch(done.fail);
            });
        }));
        it('should handle multiple subscriptions (warm)', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 4;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const changes = stocks.stateChanges();
            changes.take(1).subscribe(() => { }).add(() => {
                const sub = changes.take(1).subscribe(data => {
                    expect(data.length).toEqual(ITEMS);
                }).add(() => {
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                });
            });
        }));
        it('should be able to filter stateChanges() types - modified', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.stateChanges(['modified']).subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(1);
                expect(data[0].payload.doc.data().price).toEqual(2);
                expect(data[0].type).toEqual('modified');
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            delayUpdate(stocks, names[0], { price: 2 });
        }));
        it('should be able to filter stateChanges() types - added', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            let { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.stateChanges(['added']).skip(1).subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(1);
                expect(data[0].payload.doc.data().price).toEqual(2);
                expect(data[0].type).toEqual('added');
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            const nextId = ref.doc('a').id;
            names = names.concat([nextId]);
            delayAdd(stocks, nextId, { price: 2 });
        }));
        it('should be able to filter stateChanges() types - removed', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.stateChanges(['removed']).subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(1);
                expect(data[0].type).toEqual('removed');
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            delayDelete(stocks, names[0], 400);
        }));
    });
    describe('auditTrail()', () => {
        it('should listen to all events for auditTrail() by default', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.auditTrail().subscribe(data => {
                count = count + 1;
                if (count === 1) {
                    stocks.doc(names[0]).update({ price: 2 });
                }
                if (count === 2) {
                    sub.unsubscribe();
                    expect(data.length).toEqual(ITEMS + 1);
                    expect(data[data.length - 1].type).toEqual('modified');
                    deleteThemAll(names, ref).then(done).catch(done.fail);
                }
            });
        }));
        it('should be able to filter auditTrail() types - removed', (done) => __awaiter$2(undefined, void 0, void 0, function* () {
            const ITEMS = 10;
            const { randomCollectionName, ref, stocks, names } = yield collectionHarness(afs, ITEMS);
            const sub = stocks.auditTrail(['removed']).subscribe(data => {
                sub.unsubscribe();
                expect(data.length).toEqual(1);
                expect(data[0].type).toEqual('removed');
                deleteThemAll(names, ref).then(done).catch(done.fail);
                done();
            });
            delayDelete(stocks, names[0], 400);
        }));
    });
});

var COMMON_CONFIG$3 = {
    apiKey: "AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA",
    authDomain: "angularfire2-test.firebaseapp.com",
    databaseURL: "https://angularfire2-test.firebaseio.com",
    storageBucket: "angularfire2-test.appspot.com",
};

var FIREBASE_APP_NAME = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireDatabase', function () {
    var app;
    var db;
    var zone;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase, _angular_core.NgZone], function (app_, _db, _zone) {
            app = app_;
            db = _db;
            zone = _zone;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should be an AngularFireDatabase type', function () {
            expect(db instanceof angularfire2_database.AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app', function () {
            expect(db.database.app).toBeDefined();
            expect(db.database.app).toEqual(app);
        });
        it('should accept a Firebase App in the constructor', function () {
            var __db = new angularfire2_database.AngularFireDatabase(app.options, app.name, null, zone);
            expect(__db instanceof angularfire2_database.AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(db.database.app.name).toEqual(FIREBASE_APP_NAME);
        });
    });
});
var FIREBASE_APP_NAME_TOO$2 = (Math.random() + 1).toString(36).substring(7);
var FIREBASE_DB_NAME = "https://angularfire2-test2.firebaseio.com/";
var QUERY = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireDatabase w/options', function () {
    var app;
    var db;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME),
                angularfire2_database.AngularFireDatabaseModule
            ],
            providers: [
                { provide: angularfire2.FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO$2 },
                { provide: angularfire2.FirebaseAppConfig, useValue: COMMON_CONFIG$3 },
                { provide: angularfire2_database.RealtimeDatabaseURL, useValue: FIREBASE_DB_NAME }
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should be an AngularFireDatabase type', function () {
            expect(db instanceof angularfire2_database.AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app', function () {
            expect(db.database.app).toBeDefined();
            expect(db.database.app).toEqual(app);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(db.database.app.name).toEqual(FIREBASE_APP_NAME_TOO$2);
        });
        it('database be pointing to the provided DB instance', function () {
            expect(db.database.ref().toString()).toEqual(FIREBASE_DB_NAME);
        });
        it('list should be using the provided DB instance', function () {
            expect(db.list(QUERY).query.toString()).toEqual("" + FIREBASE_DB_NAME + QUERY);
        });
        it('object should be using the provided DB instance', function () {
            expect(db.object(QUERY).query.toString()).toEqual("" + FIREBASE_DB_NAME + QUERY);
        });
    });
});

function isString(value) {
    return typeof value === 'string';
}
function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}

function isFirebaseRef(value) {
    return typeof value.set === 'function';
}

describe('utils', function () {
    describe('isString', function () {
        it('should be able to properly detect a string', function () {
            var str = 'oh hai';
            var notStr = 101;
            var bool = true;
            var nul = null;
            var obj = {};
            var fn = function () { };
            var undef;
            expect(isString(str)).toBe(true);
            expect(isString(notStr)).toBe(false);
            expect(isString(bool)).toBe(false);
            expect(isString(nul)).toBe(false);
            expect(isString(fn)).toBe(false);
            expect(isString(undef)).toBe(false);
        });
    });
});

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var _this = undefined;
var rando = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME$1 = rando();
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
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME$1),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp], function (app_) {
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
        var obs = angularfire2_database.fromRef(itemRef, 'value');
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
        var obs = angularfire2_database.fromRef(itemRef, 'value');
        var sub = obs.take(1).subscribe(function (change) {
            expect(change.payload.exists()).toEqual(false);
            expect(change.payload.val()).toEqual(null);
        }).add(done);
    });
    it('once should complete', function (done) {
        var itemRef = ref(rando());
        itemRef.set(batch);
        var obs = angularfire2_database.fromRef(itemRef, 'value', 'once');
        obs.subscribe(function (change) { }, function () { }, done);
    });
    it('it should listen and then unsubscribe', function (done) {
        var itemRef = ref(rando());
        itemRef.set(batch);
        var obs = angularfire2_database.fromRef(itemRef, 'value');
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
        it('should stream back a child_added event', function (done) { return __awaiter$3(_this, void 0, void 0, function () {
            var itemRef, obs, count, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = angularfire2_database.fromRef(itemRef, 'child_added');
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
        it('should stream back a child_changed event', function (done) { return __awaiter$3(_this, void 0, void 0, function () {
            var itemRef, obs, name, key, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = angularfire2_database.fromRef(itemRef, 'child_changed');
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
        it('should stream back a child_removed event', function (done) { return __awaiter$3(_this, void 0, void 0, function () {
            var itemRef, obs, key, name, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = angularfire2_database.fromRef(itemRef, 'child_removed');
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
        it('should stream back a child_moved event', function (done) { return __awaiter$3(_this, void 0, void 0, function () {
            var itemRef, obs, key, name, sub;
            return __generator(this, function (_a) {
                itemRef = ref(rando());
                itemRef.set(batch);
                obs = angularfire2_database.fromRef(itemRef, 'child_moved');
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
            var obs = angularfire2_database.fromRef(itemRef, 'value');
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
            var obs = angularfire2_database.fromRef(query, 'value');
            var sub = obs.subscribe(function (change) {
                var child;
                change.payload.forEach(function (snap) { child = snap.val(); return true; });
                expect(child).toEqual(items[0]);
                done();
            });
        });
    });
});

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var rando$1 = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME$2 = rando$1();
describe('listChanges', function () {
    var app;
    var db;
    var ref;
    var batch = {};
    var items = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }].map(function (item, i) { return (__assign$1({ key: i.toString() }, item)); });
    Object.keys(items).forEach(function (key, i) {
        var itemValue = items[key];
        batch[i] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME$2),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
            app.database().goOffline();
            ref = function (path) { app.database().goOffline(); return app.database().ref(path); };
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('events', function () {
        it('should stream value at first', function (done) {
            var someRef = ref(rando$1());
            var obs = angularfire2_database.listChanges(someRef, ['child_added']);
            var sub = obs.take(1).subscribe(function (changes) {
                var data = changes.map(function (change) { return change.payload.val(); });
                expect(data).toEqual(items);
            }).add(done);
            someRef.set(batch);
        });
        it('should process a new child_added event', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref, ['child_added']);
            var sub = obs.skip(1).take(1).subscribe(function (changes) {
                var data = changes.map(function (change) { return change.payload.val(); });
                expect(data[3]).toEqual({ name: 'anotha one' });
            }).add(done);
            aref.set(batch);
            aref.push({ name: 'anotha one' });
        });
        it('should stream in order events', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref.orderByChild('name'), ['child_added']);
            var sub = obs.take(1).subscribe(function (changes) {
                var names = changes.map(function (change) { return change.payload.val().name; });
                expect(names[0]).toEqual('one');
                expect(names[1]).toEqual('two');
                expect(names[2]).toEqual('zero');
            }).add(done);
            aref.set(batch);
        });
        it('should stream in order events w/child_added', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref.orderByChild('name'), ['child_added']);
            var sub = obs.skip(1).take(1).subscribe(function (changes) {
                var names = changes.map(function (change) { return change.payload.val().name; });
                expect(names[0]).toEqual('anotha one');
                expect(names[1]).toEqual('one');
                expect(names[2]).toEqual('two');
                expect(names[3]).toEqual('zero');
            }).add(done);
            aref.set(batch);
            aref.push({ name: 'anotha one' });
        });
        it('should stream events filtering', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref.orderByChild('name').equalTo('zero'), ['child_added']);
            obs.skip(1).take(1).subscribe(function (changes) {
                var names = changes.map(function (change) { return change.payload.val().name; });
                expect(names[0]).toEqual('zero');
                expect(names[1]).toEqual('zero');
            }).add(done);
            aref.set(batch);
            aref.push({ name: 'zero' });
        });
        it('should process a new child_removed event', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref, ['child_added', 'child_removed']);
            var sub = obs.skip(1).take(1).subscribe(function (changes) {
                var data = changes.map(function (change) { return change.payload.val(); });
                expect(data.length).toEqual(items.length - 1);
            }).add(done);
            app.database().goOnline();
            aref.set(batch).then(function () {
                aref.child(items[0].key).remove();
            });
        });
        it('should process a new child_changed event', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref, ['child_added', 'child_changed']);
            var sub = obs.skip(1).take(1).subscribe(function (changes) {
                var data = changes.map(function (change) { return change.payload.val(); });
                expect(data[1].name).toEqual('lol');
            }).add(done);
            app.database().goOnline();
            aref.set(batch).then(function () {
                aref.child(items[1].key).update({ name: 'lol' });
            });
        });
        it('should process a new child_moved event', function (done) {
            var aref = ref(rando$1());
            var obs = angularfire2_database.listChanges(aref, ['child_added', 'child_moved']);
            var sub = obs.skip(1).take(1).subscribe(function (changes) {
                var data = changes.map(function (change) { return change.payload.val(); });
                expect(data[data.length - 1]).toEqual(items[0]);
            }).add(done);
            app.database().goOnline();
            aref.set(batch).then(function () {
                aref.child(items[0].key).setPriority('a', function () { });
            });
        });
    });
});

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var rando$2 = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME$3 = rando$2();
describe('snapshotChanges', function () {
    var app;
    var db;
    var createRef;
    var batch = {};
    var items = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }].map(function (item, i) { return (__assign$2({ key: i.toString() }, item)); });
    Object.keys(items).forEach(function (key, i) {
        var itemValue = items[key];
        batch[i] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME$3),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase], function (app_, _db) {
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
        var events = opts.events, skip$$1 = opts.skip;
        var aref = createRef(rando$2());
        var snapChanges = angularfire2_database.snapshotChanges(aref, events);
        return {
            snapChanges: snapChanges.skip(skip$$1),
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
        var aref = createRef(rando$2());
        aref.set({});
        angularfire2_database.snapshotChanges(aref).take(1).subscribe(function (data) {
            expect(data.length).toEqual(0);
        }).add(done);
    });
    it('should handle dynamic queries that return empty sets', function (done) {
        var ITEMS = 10;
        var count = 0;
        var firstIndex = 0;
        var namefilter$ = new rxjs_BehaviorSubject.BehaviorSubject(null);
        var aref = createRef(rando$2());
        aref.set(batch);
        namefilter$.switchMap(function (name) {
            var filteredRef = name ? aref.child('name').equalTo(name) : aref;
            return angularfire2_database.snapshotChanges(filteredRef);
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

var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var rando$3 = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME$4 = rando$3();
describe('stateChanges', function () {
    var app;
    var db;
    var createRef;
    var batch = {};
    var items = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }].map(function (item, i) { return (__assign$3({ key: i.toString() }, item)); });
    Object.keys(items).forEach(function (key, i) {
        var itemValue = items[key];
        batch[i] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME$4),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase], function (app_, _db) {
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
        var events = opts.events, skip$$1 = opts.skip;
        var aref = createRef(rando$3());
        aref.set(batch);
        var changes = angularfire2_database.stateChanges(aref, events);
        return {
            changes: changes.skip(skip$$1),
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

var __assign$4 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var rando$4 = function () { return (Math.random() + 1).toString(36).substring(7); };
var FIREBASE_APP_NAME$5 = rando$4();
describe('auditTrail', function () {
    var app;
    var db;
    var createRef;
    var batch = {};
    var items = [{ name: 'zero' }, { name: 'one' }, { name: 'two' }].map(function (item, i) { return (__assign$4({ key: i.toString() }, item)); });
    Object.keys(items).forEach(function (key, i) {
        var itemValue = items[key];
        batch[i] = itemValue;
    });
    batch = Object.freeze(batch);
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$3, FIREBASE_APP_NAME$5),
                angularfire2_database.AngularFireDatabaseModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_database.AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
            app.database().goOffline();
            createRef = function (path) { app.database().goOffline(); return app.database().ref(path); };
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    function prepareAuditTrail(opts) {
        if (opts === void 0) { opts = { skip: 0 }; }
        var events = opts.events, skip$$1 = opts.skip;
        var aref = createRef(rando$4());
        aref.set(batch);
        var changes = angularfire2_database.auditTrail(aref, events);
        return {
            changes: changes.skip(skip$$1),
            ref: aref
        };
    }
    it('should listen to all events by default', function (done) {
        var changes = prepareAuditTrail().changes;
        changes.subscribe(function (actions) {
            var data = actions.map(function (a) { return a.payload.val(); });
            expect(data).toEqual(items);
            done();
        });
    });
});

var COMMON_CONFIG$4 = {
    apiKey: "AIzaSyBVSy3YpkVGiKXbbxeK0qBnu3-MNZ9UIjA",
    authDomain: "angularfire2-test.firebaseapp.com",
    databaseURL: "https://angularfire2-test.firebaseio.com",
    projectId: "angularfire2-test",
    storageBucket: "angularfire2-test.appspot.com",
};

describe('AngularFireStorage', function () {
    var app;
    var afStorage;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$4),
                angularfire2_storage.AngularFireStorageModule
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_storage.AngularFireStorage], function (app_, _storage) {
            app = app_;
            afStorage = _storage;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    it('should exist', function () {
        expect(afStorage instanceof angularfire2_storage.AngularFireStorage).toBe(true);
    });
    it('should have the Firebase storage instance', function () {
        expect(afStorage.storage).toBeDefined();
    });
    it('should have an initialized Firebase app', function () {
        expect(afStorage.storage.app).toBeDefined();
        expect(afStorage.storage.app).toEqual(app);
    });
    describe('upload task', function () {
        it('should upload and delete a file', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = task.snapshotChanges()
                .subscribe(function (snap) { expect(snap).toBeDefined(); }, function (e) { done.fail(); }, function () {
                ref.delete().subscribe(done, done.fail);
            });
        });
        it('should upload a file and observe the download url', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var url$ = task.downloadURL();
            url$.subscribe(function (url) { expect(url).toBeDefined(); }, function (e) { done.fail(); }, function () { ref.delete().subscribe(done, done.fail); });
        });
        it('should resolve the task as a promise', function (done) {
            var data = { angular: "promise" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            task.then(function (snap) {
                expect(snap).toBeDefined();
                done();
            }).catch(done.fail);
        });
    });
    describe('reference', function () {
        it('it should upload, download, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = rxjs_observable_forkJoin.forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getDownloadURL(); })
                .do(function (url) { return expect(url).toBeDefined(); })
                .mergeMap(function (url) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
        it('should upload, get metadata, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob, { customMetadata: { blah: 'blah' } });
            var sub = rxjs_observable_forkJoin.forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getMetadata(); })
                .do(function (meta) { return expect(meta.customMetadata).toEqual({ blah: 'blah' }); })
                .mergeMap(function (meta) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
    });
});
var FIREBASE_APP_NAME_TOO$3 = (Math.random() + 1).toString(36).substring(7);
var FIREBASE_STORAGE_BUCKET = 'angularfire2-test2';
describe('AngularFireStorage w/options', function () {
    var app;
    var afStorage;
    beforeEach(function () {
        _angular_core_testing.TestBed.configureTestingModule({
            imports: [
                angularfire2.AngularFireModule.initializeApp(COMMON_CONFIG$4),
                angularfire2_storage.AngularFireStorageModule
            ],
            providers: [
                { provide: angularfire2.FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO$3 },
                { provide: angularfire2.FirebaseAppConfig, useValue: COMMON_CONFIG$4 },
                { provide: angularfire2_storage.StorageBucket, useValue: FIREBASE_STORAGE_BUCKET }
            ]
        });
        _angular_core_testing.inject([angularfire2.FirebaseApp, angularfire2_storage.AngularFireStorage], function (app_, _storage) {
            app = app_;
            afStorage = _storage;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should exist', function () {
            expect(afStorage instanceof angularfire2_storage.AngularFireStorage).toBe(true);
        });
        it('should have the Firebase storage instance', function () {
            expect(afStorage.storage).toBeDefined();
        });
        it('should have an initialized Firebase app', function () {
            expect(afStorage.storage.app).toBeDefined();
            expect(afStorage.storage.app).toEqual(app);
        });
        it('should be hooked up the right app', function () {
            expect(afStorage.storage.app.name).toEqual(FIREBASE_APP_NAME_TOO$3);
        });
        it('storage be pointing towards a different bucket', function () {
            expect(afStorage.storage.ref().toString()).toEqual("gs://" + FIREBASE_STORAGE_BUCKET + "/");
        });
        it('it should upload, download, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = rxjs_observable_forkJoin.forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getDownloadURL(); })
                .do(function (url) { return expect(url).toMatch(new RegExp("https:\\/\\/firebasestorage\\.googleapis\\.com\\/v0\\/b\\/" + FIREBASE_STORAGE_BUCKET + "\\/o\\/af\\.json")); })
                .mergeMap(function (url) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
    });
});

// These paths are written to use the dist build


// // Since this a deprecated API, we run on it on manual tests only
// // It needs a network connection to run which makes it flaky on Travis
// export * from './packages-dist/database-deprecated/firebase_list_factory.spec';
// export * from './packages-dist/database-deprecated/firebase_object_factory.spec';
// export * from './packages-dist/database-deprecated/firebase_list_observable.spec';
// export * from './packages-dist/database-deprecated/firebase_object_observable.spec';
// export * from './packages-dist/database-deprecated/query_observable.spec';

Object.defineProperty(exports, '__esModule', { value: true });

})));
