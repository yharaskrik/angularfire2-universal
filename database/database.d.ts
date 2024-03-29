import { NgZone } from '@angular/core';
import { FirebaseDatabase } from '@firebase/database-types';
import { PathReference, QueryFn, AngularFireList, AngularFireObject } from './interfaces';
import { FirebaseOptions } from '@firebase/app-types';
import { RealtimeDatabaseURL, FirebaseZoneScheduler } from 'angularfire2';
export declare class AngularFireDatabase {
    readonly database: FirebaseDatabase;
    readonly scheduler: FirebaseZoneScheduler;
    constructor(config: FirebaseOptions, name: string, databaseURL: string, zone: NgZone);
    list<T>(pathOrRef: PathReference, queryFn?: QueryFn): AngularFireList<T>;
    object<T>(pathOrRef: PathReference): AngularFireObject<T>;
    createPushId(): string | null;
}
export { PathReference, DatabaseQuery, DatabaseReference, DatabaseSnapshot, ChildEvent, ListenEvent, QueryFn, AngularFireList, AngularFireObject, AngularFireAction, Action, SnapshotAction } from './interfaces';
export { RealtimeDatabaseURL };
