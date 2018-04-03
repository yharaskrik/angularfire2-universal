import { InjectionToken, NgZone } from '@angular/core';
import { FirebaseStorage, UploadMetadata } from '@firebase/storage-types';
import { AngularFireStorageReference } from './ref';
import { AngularFireUploadTask } from './task';
import { FirebaseOptions } from '@firebase/app-types';
export declare const StorageBucket: InjectionToken<string>;
export declare class AngularFireStorage {
    readonly storage: FirebaseStorage;
    constructor(config: FirebaseOptions, name: string, storageBucket: string, zone: NgZone);
    ref(path: string): AngularFireStorageReference;
    upload(path: string, data: any, metadata?: UploadMetadata): AngularFireUploadTask;
}
