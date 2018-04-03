var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const FAKE_STOCK_DATA = { name: 'FAKE', price: 1 };
export const randomName = (firestore) => firestore.collection('a').doc().id;
export const createRandomStocks = (firestore, collectionRef, numberOfItems) => __awaiter(this, void 0, void 0, function* () {
    const batch = firestore.batch();
    let count = 0;
    let names = [];
    Array.from(Array(numberOfItems)).forEach((a, i) => {
        const name = randomName(firestore);
        batch.set(collectionRef.doc(name), FAKE_STOCK_DATA);
        names = [...names, name];
    });
    yield batch.commit();
    return names;
});
export function deleteThemAll(names, ref) {
    const promises = names.map(name => ref.doc(name).delete());
    return Promise.all(promises);
}
export function delayUpdate(collection, path, data, delay = 250) {
    setTimeout(() => {
        collection.doc(path).update(data);
    }, delay);
}
export function delayAdd(collection, path, data, delay = 250) {
    setTimeout(() => {
        collection.doc(path).set(data);
    }, delay);
}
export function delayDelete(collection, path, delay = 250) {
    setTimeout(() => {
        collection.doc(path).delete();
    }, delay);
}
//# sourceMappingURL=utils.spec.js.map