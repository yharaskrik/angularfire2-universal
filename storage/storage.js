import { Injectable, Inject, Optional, InjectionToken, NgZone } from '@angular/core';
import { createStorageRef } from './ref';
import { FirebaseAppConfig, FirebaseAppName, _firebaseAppFactory } from 'angularfire2';
export var StorageBucket = new InjectionToken('angularfire2.storageBucket');
var AngularFireStorage = (function () {
    function AngularFireStorage(config, name, storageBucket, zone) {
        this.storage = zone.runOutsideAngular(function () {
            var app = _firebaseAppFactory(config, name);
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
        { type: Injectable },
    ];
    AngularFireStorage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseAppConfig,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FirebaseAppName,] },] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [StorageBucket,] },] },
        { type: NgZone, },
    ]; };
    return AngularFireStorage;
}());
export { AngularFireStorage };
//# sourceMappingURL=storage.js.map