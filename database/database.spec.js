import { FirebaseApp, FirebaseAppConfig, AngularFireModule, FirebaseAppName } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, RealtimeDatabaseURL } from 'angularfire2/database';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from './test-config';
import { NgZone } from '@angular/core';
var FIREBASE_APP_NAME = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireDatabase', function () {
    var app;
    var db;
    var zone;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase, NgZone], function (app_, _db, _zone) {
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
            expect(db instanceof AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app', function () {
            expect(db.database.app).toBeDefined();
            expect(db.database.app).toEqual(app);
        });
        it('should accept a Firebase App in the constructor', function () {
            var __db = new AngularFireDatabase(app.options, app.name, null, zone);
            expect(__db instanceof AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(db.database.app.name).toEqual(FIREBASE_APP_NAME);
        });
    });
});
var FIREBASE_APP_NAME_TOO = (Math.random() + 1).toString(36).substring(7);
var FIREBASE_DB_NAME = "https://angularfire2-test2.firebaseio.com/";
var QUERY = (Math.random() + 1).toString(36).substring(7);
describe('AngularFireDatabase w/options', function () {
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, FIREBASE_APP_NAME),
                AngularFireDatabaseModule
            ],
            providers: [
                { provide: FirebaseAppName, useValue: FIREBASE_APP_NAME_TOO },
                { provide: FirebaseAppConfig, useValue: COMMON_CONFIG },
                { provide: RealtimeDatabaseURL, useValue: FIREBASE_DB_NAME }
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
        it('should be an AngularFireDatabase type', function () {
            expect(db instanceof AngularFireDatabase).toEqual(true);
        });
        it('should have an initialized Firebase app', function () {
            expect(db.database.app).toBeDefined();
            expect(db.database.app).toEqual(app);
        });
        it('should have an initialized Firebase app instance member', function () {
            expect(db.database.app.name).toEqual(FIREBASE_APP_NAME_TOO);
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
//# sourceMappingURL=database.spec.js.map