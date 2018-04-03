import { FirebaseFirestore, CollectionReference } from '@firebase/firestore-types';
import { AngularFirestoreCollection } from './collection/collection';
export interface Stock {
    name: string;
    price: number;
}
export declare const FAKE_STOCK_DATA: {
    name: string;
    price: number;
};
export declare const randomName: (firestore: any) => string;
export declare const createRandomStocks: (firestore: FirebaseFirestore, collectionRef: CollectionReference, numberOfItems: any) => Promise<string[]>;
export declare function deleteThemAll(names: any, ref: any): Promise<{}[]>;
export declare function delayUpdate<T>(collection: AngularFirestoreCollection<T>, path: any, data: any, delay?: number): void;
export declare function delayAdd<T>(collection: AngularFirestoreCollection<T>, path: any, data: any, delay?: number): void;
export declare function delayDelete<T>(collection: AngularFirestoreCollection<T>, path: any, delay?: number): void;
