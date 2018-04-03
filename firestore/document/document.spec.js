var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFirestore } from '../firestore';
import { AngularFirestoreModule } from '../firestore.module';
import { AngularFirestoreDocument } from '../document/document';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from '../test-config';
import { randomName, FAKE_STOCK_DATA } from '../utils.spec';
describe('AngularFirestoreDocument', () => {
    let app;
    let afs;
    let sub;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG),
                AngularFirestoreModule.enablePersistence()
            ]
        });
        inject([FirebaseApp, AngularFirestore], (_app, _afs) => {
            app = _app;
            afs = _afs;
        })();
    });
    afterEach((done) => __awaiter(this, void 0, void 0, function* () {
        yield app.delete();
        done();
    }));
    it('should get action updates', (done) => __awaiter(this, void 0, void 0, function* () {
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
    it('should get unwrapped snapshot', (done) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=document.spec.js.map