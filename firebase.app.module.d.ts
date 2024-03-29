import { InjectionToken } from '@angular/core';
import { FirebaseApp as _FirebaseApp, FirebaseOptions } from '@firebase/app-types';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseDatabase } from '@firebase/database-types';
import { FirebaseMessaging } from '@firebase/messaging-types';
import { FirebaseStorage } from '@firebase/storage-types';
import { FirebaseFirestore } from '@firebase/firestore-types';
export declare class FirebaseApp implements _FirebaseApp {
    name: string;
    options: {};
    auth: () => FirebaseAuth;
    database: (databaseURL?: string) => FirebaseDatabase;
    messaging: () => FirebaseMessaging;
    storage: (storageBucket?: string) => FirebaseStorage;
    delete: () => Promise<void>;
    firestore: () => FirebaseFirestore;
}
export declare function _firebaseAppFactory(config: FirebaseOptions, name?: string): FirebaseApp;
export declare class AngularFireModule {
    static initializeApp(config: FirebaseOptions, appName?: string): {
        ngModule: typeof AngularFireModule;
        providers: ({
            provide: InjectionToken<FirebaseOptions>;
            useValue: FirebaseOptions;
        } | {
            provide: InjectionToken<string>;
            useValue: string | undefined;
        })[];
    };
}
