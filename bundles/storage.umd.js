(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/Observable'), require('rxjs/operators'), require('rxjs/observable/from'), require('@angular/core'), require('angularfire2'), require('@firebase/storage')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Observable', 'rxjs/operators', 'rxjs/observable/from', '@angular/core', 'angularfire2', '@firebase/storage'], factory) :
    (factory((global.angularfire2 = global.angularfire2 || {}, global.angularfire2.storage = global.angularfire2.storage || {}),global.Rx,global.Rx.operators,global.Rx.Observable,global.ng.core,global.angularfire2,global.firebase));
}(this, (function (exports,rxjs_Observable,rxjs_operators,rxjs_observable_from,_angular_core,angularfire2,_firebase_storage) { 'use strict';

function fromTask(task) {
    return new rxjs_Observable.Observable(function (subscriber) {
        var progress = function (snap) { return subscriber.next(snap); };
        var error = function (e) { return subscriber.error(e); };
        var complete = function () { return subscriber.complete(); };
        task.on('state_changed', progress, error, complete);
        return function () { return task.cancel(); };
    });
}

function createUploadTask(task) {
    var inner$ = fromTask(task);
    return {
        task: task,
        then: task.then.bind(task),
        catch: task.catch.bind(task),
        pause: task.pause.bind(task),
        cancel: task.cancel.bind(task),
        resume: task.resume.bind(task),
        snapshotChanges: function () { return inner$; },
        downloadURL: function () { return rxjs_observable_from.from(task.then(function (s) { return s.downloadURL; })); },
        percentageChanges: function () {
            return inner$.pipe(rxjs_operators.map(function (s) { return s.bytesTransferred / s.totalBytes * 100; }));
        }
    };
}

function createStorageRef(ref) {
    return {
        getDownloadURL: function () { return rxjs_observable_from.from(ref.getDownloadURL()); },
        getMetadata: function () { return rxjs_observable_from.from(ref.getMetadata()); },
        delete: function () { return rxjs_observable_from.from(ref.delete()); },
        child: function (path) { return createStorageRef(ref.child(path)); },
        updateMetatdata: function (meta) { return rxjs_observable_from.from(ref.updateMetadata(meta)); },
        put: function (data, metadata) {
            var task = ref.put(data, metadata);
            return createUploadTask(task);
        },
        putString: function (data, format, metadata) {
            var task = ref.putString(data, format, metadata);
            return createUploadTask(task);
        }
    };
}

var StorageBucket = new _angular_core.InjectionToken('angularfire2.storageBucket');
var AngularFireStorage = (function () {
    function AngularFireStorage(config, name, storageBucket, zone) {
        this.storage = zone.runOutsideAngular(function () {
            var app = angularfire2._firebaseAppFactory(config, name);
            return app.storage(storageBucket || undefined);
        });
    }
    AngularFireStorage.prototype.ref = function (path) {
        return createStorageRef(this.storage.ref(path));
    };
    AngularFireStorage.prototype.upload = function (path, data, metadata) {
        var storageRef = this.storage.ref(path);
        var ref = createStorageRef(storageRef);
        return ref.put(data, metadata);
    };
    AngularFireStorage.decorators = [
        { type: _angular_core.Injectable },
    ];
    AngularFireStorage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [angularfire2.FirebaseAppConfig,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [angularfire2.FirebaseAppName,] },] },
        { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [StorageBucket,] },] },
        { type: _angular_core.NgZone, },
    ]; };
    return AngularFireStorage;
}());

var AngularFireStorageModule = (function () {
    function AngularFireStorageModule() {
    }
    AngularFireStorageModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [AngularFireStorage]
                },] },
    ];
    AngularFireStorageModule.ctorParameters = function () { return []; };
    return AngularFireStorageModule;
}());

exports.createStorageRef = createStorageRef;
exports.StorageBucket = StorageBucket;
exports.AngularFireStorage = AngularFireStorage;
exports.createUploadTask = createUploadTask;
exports.fromTask = fromTask;
exports.AngularFireStorageModule = AngularFireStorageModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
