import { forkJoin } from 'rxjs/observable/forkJoin';
import { TestBed, inject } from '@angular/core/testing';
import { FirebaseApp, FirebaseAppConfig, AngularFireModule, FirebaseAppName } from 'angularfire2';
import { AngularFireStorageModule, AngularFireStorage, StorageBucket } from 'angularfire2/storage';
import { COMMON_CONFIG } from './test-config';
describe('AngularFireStorage', function () {
    var app;
    var afStorage;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFireStorageModule
            ]
        });
        inject([FirebaseApp, AngularFireStorage], function (app_, _storage) {
            app = app_;
            afStorage = _storage;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    it('should exist', function () {
        expect(afStorage instanceof AngularFireStorage).toBe(true);
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
            var sub = forkJoin(task.snapshotChanges())
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
            var sub = forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getMetadata(); })
                .do(function (meta) { return expect(meta.customMetadata).toEqual({ blah: 'blah' }); })
                .mergeMap(function (meta) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
    });
});
var FIREBASE_APP_NAME_TOO = (Math.random() + 1).toString(36).substring(7);
var FIREBASE_STORAGE_BUCKET = 'angularfire2-test2';
describe('AngularFireStorage w/options', function () {
    var app;
    var afStorage;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFireStorageModule
            ],
            providers: [
                { provide: FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO },
                { provide: FirebaseAppConfig, useValue: COMMON_CONFIG },
                { provide: StorageBucket, useValue: FIREBASE_STORAGE_BUCKET }
            ]
        });
        inject([FirebaseApp, AngularFireStorage], function (app_, _storage) {
            app = app_;
            afStorage = _storage;
        })();
    });
    afterEach(function (done) {
        app.delete().then(done, done.fail);
    });
    describe('<constructor>', function () {
        it('should exist', function () {
            expect(afStorage instanceof AngularFireStorage).toBe(true);
        });
        it('should have the Firebase storage instance', function () {
            expect(afStorage.storage).toBeDefined();
        });
        it('should have an initialized Firebase app', function () {
            expect(afStorage.storage.app).toBeDefined();
            expect(afStorage.storage.app).toEqual(app);
        });
        it('should be hooked up the right app', function () {
            expect(afStorage.storage.app.name).toEqual(FIREBASE_APP_NAME_TOO);
        });
        it('storage be pointing towards a different bucket', function () {
            expect(afStorage.storage.ref().toString()).toEqual("gs://" + FIREBASE_STORAGE_BUCKET + "/");
        });
        it('it should upload, download, and delete', function (done) {
            var data = { angular: "fire" };
            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            var ref = afStorage.ref('af.json');
            var task = ref.put(blob);
            var sub = forkJoin(task.snapshotChanges())
                .mergeMap(function () { return ref.getDownloadURL(); })
                .do(function (url) { return expect(url).toMatch(new RegExp("https:\\/\\/firebasestorage\\.googleapis\\.com\\/v0\\/b\\/" + FIREBASE_STORAGE_BUCKET + "\\/o\\/af\\.json")); })
                .mergeMap(function (url) { return ref.delete(); })
                .subscribe(done, done.fail);
        });
    });
});
//# sourceMappingURL=storage.spec.js.map