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
import { AngularFirestoreCollection } from './collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/skip';
import { TestBed, inject } from '@angular/core/testing';
import { COMMON_CONFIG } from '../test-config';
import { randomName, FAKE_STOCK_DATA, createRandomStocks, delayAdd, delayDelete, delayUpdate, deleteThemAll } from '../utils.spec';
function collectionHarness(afs, items, queryFn) {
    return __awaiter(this, void 0, void 0, function* () {
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
    describe('valueChanges()', () => {
        it('should get unwrapped snapshot', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (hot)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (warm)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle dynamic queries that return empty sets', (done) => __awaiter(this, void 0, void 0, function* () {
            const ITEMS = 10;
            let count = 0;
            let firstIndex = 0;
            let pricefilter$ = new BehaviorSubject(null);
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
        it('should listen to all snapshotChanges() by default', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (hot)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (warm)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should update order on queries', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter snapshotChanges() types - modified', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter snapshotChanges() types - added', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter snapshotChanges() types - added/modified', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter snapshotChanges() types - removed', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should get stateChanges() updates', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should listen to all stateChanges() by default', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (hot)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should handle multiple subscriptions (warm)', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter stateChanges() types - modified', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter stateChanges() types - added', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter stateChanges() types - removed', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should listen to all events for auditTrail() by default', (done) => __awaiter(this, void 0, void 0, function* () {
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
        it('should be able to filter auditTrail() types - removed', (done) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=collection.spec.js.map