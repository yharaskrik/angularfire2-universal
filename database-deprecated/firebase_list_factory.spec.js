import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, FirebaseListObservable, FirebaseListFactory, onChildAdded, onChildChanged, onChildRemoved, onChildUpdated } from 'angularfire2/database-deprecated';
import { TestBed, inject } from '@angular/core/testing';
import * as utils from './utils';
import { Subject } from 'rxjs';
import { COMMON_CONFIG } from './test-config';
import { _do } from 'rxjs/operator/do';
import { map } from 'rxjs/operator/map';
import { skip } from 'rxjs/operator/skip';
import { take } from 'rxjs/operator/take';
import { toArray } from 'rxjs/operator/toArray';
import { toPromise } from 'rxjs/operator/toPromise';
var questionsPath = 'questions';
function queryTest(observable, subject, done) {
    var nexted = false;
    skipAndTake(observable, 2)
        .subscribe(function (val) {
        if (!nexted) {
            subject.next('2');
        }
        if (nexted) {
            expect(nexted).toBe(true);
            done();
        }
        nexted = true;
    });
    subject.next('20');
}
describe('AngularFireDatabase', function () {
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, '[DEFAULT]'),
                AngularFireDatabaseModule
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
        it('should accept a Firebase db url in the constructor', function () {
            expect(db instanceof AngularFireDatabase).toBe(true);
        });
    });
});
describe('FirebaseListFactory', function () {
    var app;
    var db;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(COMMON_CONFIG, '[DEFAULT]'),
                AngularFireDatabaseModule
            ]
        });
        inject([FirebaseApp, AngularFireDatabase], function (app_, _db) {
            app = app_;
            db = _db;
        })();
    });
    describe('<constructor>', function () {
        it('should accept a Firebase db ref in the constructor', function () {
            var list = FirebaseListFactory(app.database().ref("questions"));
            expect(list instanceof FirebaseListObservable).toBe(true);
        });
    });
    describe('query', function () {
        describe('orderByChild', function () {
            it('equalTo - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        equalTo: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('startAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        startAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('endAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        endAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('should throw an error if limitToLast and limitToFirst are chained', function () {
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        limitToFirst: 10,
                        limitToLast: 100
                    }
                });
                expect(observable.subscribe).toThrowError();
            });
            it('should throw an error if startAt is used with equalTo', function () {
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        equalTo: 10,
                        startAt: 100
                    }
                });
                expect(observable.subscribe).toThrowError();
            });
            it('should throw an error if endAt is used with equalTo', function () {
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        equalTo: 10,
                        endAt: 100
                    }
                });
                expect(observable.subscribe).toThrowError();
            });
            it('should throw an error if startAt and endAt is used with equalTo', function () {
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByChild: 'height',
                        equalTo: 10,
                        endAt: 100,
                        startAt: 103
                    }
                });
                expect(observable.subscribe).toThrowError();
            });
        });
        describe('orderByValue', function () {
            it('equalTo - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByValue: true,
                        equalTo: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('startAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByValue: true,
                        startAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('endAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByValue: true,
                        endAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
        });
        describe('orderByKey', function () {
            it('equalTo - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        equalTo: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('startAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        startAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('endAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        endAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
        });
        describe('orderByPriority', function () {
            it('equalTo - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        equalTo: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('startAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        startAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
            it('endAt - should re-run a query when the observable value has emitted', function (done) {
                var subject = new Subject();
                var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                    query: {
                        orderByKey: true,
                        endAt: subject
                    }
                });
                queryTest(observable, subject, done);
            });
        });
    });
    describe('shape', function () {
        it('should have a a FirebaseListObservable shape when queried', function () {
            var observable = FirebaseListFactory(app.database().ref(questionsPath), {
                query: {
                    orderByChild: 'height',
                    equalTo: '1'
                }
            });
            expect(observable.push instanceof Function).toBe(true);
            expect(observable.update instanceof Function).toBe(true);
            expect(observable.remove instanceof Function).toBe(true);
        });
    });
    describe('methods', function () {
        var toKey;
        var val1;
        var val2;
        var val3;
        var questions;
        var questionsSnapshotted;
        var ref;
        var refSnapshotted;
        var subscription;
        beforeEach(function (done) {
            toKey = function (val) { return val.key; };
            val1 = { key: 'key1' };
            val2 = { key: 'key2' };
            val3 = { key: 'key3' };
            app.database().ref().remove(done);
            questions = FirebaseListFactory(app.database().ref("questions"));
            questionsSnapshotted = FirebaseListFactory(app.database().ref("questionssnapshot"), { preserveSnapshot: true });
            ref = questions.$ref;
            refSnapshotted = questionsSnapshotted.$ref;
        });
        afterEach(function (done) {
            if (subscription && !subscription.closed) {
                subscription.unsubscribe();
            }
            Promise.all([ref.remove(), refSnapshotted.remove()]).then(done, done.fail);
        });
        it('should emit only when the initial data set has been loaded', function (done) {
            questions.$ref.ref.set([{ initial1: true }, { initial2: true }, { initial3: true }, { initial4: true }])
                .then(function () { return toPromise.call(skipAndTake(questions, 1)); })
                .then(function (val) {
                expect(val.length).toBe(4);
            })
                .then(function () {
                done();
            }, done.fail);
        });
        it('should be resistant to non-asynchronous child_added quirks', function (done) {
            questions.$ref.ref.push({ number: 1 })
                .then(function () {
                var calls = [];
                questions.$ref.ref.once('child_added', function (snap) { return calls.push('child_added:' + snap.val().number); });
                skipAndTake(questions).subscribe(function (list) {
                    expect(calls).toEqual(['child_added:2', 'pushed']);
                    expect(list.map(function (i) { return i.number; })).toEqual([1, 2]);
                    done();
                }, done.fail);
                questions.push({ number: 2 });
                calls.push('pushed');
            })
                .catch(done.fail);
        });
        it('should emit a new value when a child moves', function (done) {
            var question = skipAndTake(questions, 1, 2);
            subscription = _do.call(question, function (data) {
                expect(data.length).toBe(2);
                expect(data[0].push2).toBe(true);
                expect(data[1].push1).toBe(true);
            })
                .subscribe(function () {
                done();
            }, done.fail);
            var child1 = ref.push({ push1: true }, function () {
                ref.push({ push2: true }, function () {
                    child1.setPriority('ZZZZ');
                });
            });
        });
        it('should emit unwrapped data by default', function (done) {
            ref.remove(function () {
                ref.push({ unwrapped: true }, function () {
                    subscription = _do.call(skipAndTake(questions, 1), function (data) {
                        expect(data.length).toBe(1);
                        expect(data[0].unwrapped).toBe(true);
                    })
                        .subscribe(function () {
                        done();
                    }, done.fail);
                });
            });
        });
        it('should emit snapshots if preserveSnapshot option is true', function (done) {
            refSnapshotted.push('hello snapshot!', function () {
                subscription = _do.call(skipAndTake(questionsSnapshotted, 1), function (data) {
                    expect(data[0].val()).toEqual('hello snapshot!');
                })
                    .subscribe(function () {
                    done();
                }, done.fail);
            });
        });
        it('should re-emit identical instances of unchanged children', function (done) {
            var prev;
            take.call(questions, 2).subscribe(function (list) {
                if (prev) {
                    expect(list[0]).toBe(prev[0]);
                    done();
                }
                else {
                    prev = list;
                    questions.push({ name: 'bob' });
                }
            }, done.fail);
            questions.push({ name: 'alice' });
        });
        it('should re-emit identical instances of unchanged children as snapshots', function (done) {
            var prev;
            take.call(questionsSnapshotted, 2).subscribe(function (list) {
                if (prev) {
                    expect(list[0]).toBe(prev[0]);
                    done();
                }
                else {
                    prev = list;
                    questionsSnapshotted.push({ name: 'bob' });
                }
            }, done.fail);
            questionsSnapshotted.push({ name: 'alice' });
        });
        it('should support null for equalTo queries', function (done) {
            questions.$ref.ref.set({
                val1: val1,
                val2: Object.assign({}, val2, { extra: true }),
                val3: Object.assign({}, val3, { extra: true }),
            })
                .then(function () {
                var query = FirebaseListFactory(questions.$ref.ref, {
                    query: {
                        orderByChild: "extra",
                        equalTo: null
                    }
                });
                take.call(query, 1).subscribe(function (list) {
                    expect(list.length).toEqual(1);
                    expect(list[0].$key).toEqual("val1");
                    done();
                }, done.fail);
            });
        });
        it('should support null for startAt/endAt queries', function (done) {
            questions.$ref.ref.set({
                val1: val1,
                val2: Object.assign({}, val2, { extra: true }),
                val3: Object.assign({}, val3, { extra: true }),
            })
                .then(function () {
                var query = FirebaseListFactory(questions.$ref.ref, {
                    query: {
                        orderByChild: "extra",
                        startAt: null,
                        endAt: null
                    }
                });
                take.call(query, 1).subscribe(function (list) {
                    expect(list.length).toEqual(1);
                    expect(list[0].$key).toEqual("val1");
                    done();
                }, done.fail);
            });
        });
        it('should call off on all events when disposed', function (done) {
            var questionRef = app.database().ref().child('questions');
            subscription = FirebaseListFactory(questionRef).subscribe(function (_) {
                var firebaseSpy = spyOn(questionRef, 'off').and.callThrough();
                expect(firebaseSpy).not.toHaveBeenCalled();
                subscription.unsubscribe();
                expect(firebaseSpy).toHaveBeenCalled();
                done();
            });
        });
        describe('onChildAdded', function () {
            it('should add the child after the prevKey', function () {
                expect(onChildAdded([val1, val2], val3, toKey, 'key1')).toEqual([val1, val3, val2]);
            });
            it('should not mutate the input array', function () {
                var inputArr = [val1];
                expect(onChildAdded(inputArr, val2, toKey, 'key1')).not.toEqual(inputArr);
            });
        });
        describe('onChildChanged', function () {
            it('should move the child after the specified prevKey', function () {
                expect(onChildChanged([val1, val2], val1, toKey, 'key2')).toEqual([val2, val1]);
            });
            it('should move the child to the beginning if prevKey is null', function () {
                expect(onChildChanged([val1, val2, val3], val2, toKey, null)).toEqual([val2, val1, val3]);
            });
            it('should not duplicate the first item if it is the one that changed', function () {
                expect(onChildChanged([val1, val2, val3], val1, toKey, null)).not.toEqual([val1, val1, val2, val3]);
            });
            it('should not mutate the input array', function () {
                var inputArr = [val1, val2];
                expect(onChildChanged(inputArr, val1, toKey, 'key2')).not.toEqual(inputArr);
            });
            it('should update the child', function () {
                expect(onChildUpdated([val1, val2, val3], { key: 'newkey' }, toKey, 'key1').map(function (v) { return v.key; })).toEqual(['key1', 'newkey', 'key3']);
            });
        });
        describe('onChildRemoved', function () {
            it('should remove the child', function () {
                expect(onChildRemoved([val1, val2, val3], val2, toKey)).toEqual([val1, val3]);
            });
        });
        describe('utils.unwrapMapFn', function () {
            var val = { unwrapped: true };
            var snapshot = {
                ref: { key: 'key' },
                val: function () { return val; }
            };
            it('should return an object value with a $key property', function () {
                var unwrapped = utils.unwrapMapFn(snapshot);
                expect(unwrapped.$key).toEqual(snapshot.ref.key);
            });
            it('should return an object value with a $value property if value is scalar', function () {
                var existsFn = function () { return true; };
                var unwrappedValue5 = utils.unwrapMapFn(Object.assign(snapshot, { val: function () { return 5; }, exists: existsFn }));
                var unwrappedValueFalse = utils.unwrapMapFn(Object.assign(snapshot, { val: function () { return false; }, exists: existsFn }));
                var unwrappedValueLol = utils.unwrapMapFn(Object.assign(snapshot, { val: function () { return 'lol'; }, exists: existsFn }));
                expect(unwrappedValue5.$key).toEqual('key');
                expect(unwrappedValue5.$value).toEqual(5);
                expect(unwrappedValue5.$exists()).toEqual(true);
                expect(unwrappedValueFalse.$key).toEqual('key');
                expect(unwrappedValueFalse.$value).toEqual(false);
                expect(unwrappedValueFalse.$exists()).toEqual(true);
                expect(unwrappedValueLol.$key).toEqual('key');
                expect(unwrappedValueLol.$value).toEqual('lol');
                expect(unwrappedValueLol.$exists()).toEqual(true);
            });
        });
        it('should emit values in the observable creation zone', function (done) {
            Zone.current.fork({
                name: 'newZone'
            })
                .run(function () {
                subscription = FirebaseListFactory(app.database().ref("questions"))
                    .filter(function (d) { return d
                    .map(function (v) { return v.$value; })
                    .indexOf('in-the-zone') > -1; })
                    .subscribe(function (data) {
                    expect(Zone.current.name).toBe('newZone');
                    done();
                });
            });
            ref.remove(function () {
                ref.push('in-the-zone');
            });
        });
        describe('Removing and replacing a child key', function () {
            var firstKey = 'index1';
            var middleKey = 'index2';
            var lastKey = 'index3';
            var initialData = (_a = {},
                _a[firstKey] = true,
                _a[middleKey] = true,
                _a[lastKey] = true,
                _a);
            var keyToRemove;
            afterEach(function (done) {
                subscription = questions
                    .skip(2)
                    .take(1)
                    .subscribe(function (items) {
                    expect(items.length).toBe(3);
                    done();
                }, done.fail);
                questions.$ref.ref.set(initialData)
                    .then(function () { return ref.child(keyToRemove).remove(); })
                    .then(function () { return ref.child(keyToRemove).set(true); });
            });
            it('should work with the first item in the list', function () {
                keyToRemove = firstKey;
            });
            it('should work with the middle item in the list', function () {
                keyToRemove = middleKey;
            });
            it('should work with the last item in the list', function () {
                keyToRemove = lastKey;
            });
            var _a;
        });
        describe('startAt(value, key)', function () {
            it('should support the optional key parameter to startAt', function (done) {
                questions.$ref.ref.set({
                    val1: Object.assign({}, val1, { data: 0 }),
                    val2: Object.assign({}, val2, { data: 0 }),
                    val3: Object.assign({}, val3, { data: 0 })
                })
                    .then(function () {
                    var query1 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            startAt: { value: 0 }
                        }
                    });
                    var promise1 = toPromise.call(take.call(query1, 1));
                    var query2 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            startAt: { value: 0, key: 'val2' }
                        }
                    });
                    var promise2 = toPromise.call(take.call(query2, 1));
                    Promise.all([promise1, promise2]).then(function (_a) {
                        var list1 = _a[0], list2 = _a[1];
                        expect(list1.map(function (i) { return i.$key; })).toEqual(['val1', 'val2', 'val3']);
                        expect(list2.map(function (i) { return i.$key; })).toEqual(['val2', 'val3']);
                        done();
                    });
                })
                    .catch(done.fail);
            });
        });
        describe('equalTo(value, key)', function () {
            it('should support the optional key parameter to equalTo', function (done) {
                questions.$ref.ref.set({
                    val1: Object.assign({}, val1, { data: 0 }),
                    val2: Object.assign({}, val2, { data: 0 }),
                    val3: Object.assign({}, val3, { data: 0 })
                })
                    .then(function () {
                    var query1 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            equalTo: { value: 0 }
                        }
                    });
                    var promise1 = toPromise.call(take.call(query1, 1));
                    var query2 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            equalTo: { value: 0, key: 'val2' }
                        }
                    });
                    var promise2 = toPromise.call(take.call(query2, 1));
                    Promise.all([promise1, promise2]).then(function (_a) {
                        var list1 = _a[0], list2 = _a[1];
                        expect(list1.map(function (i) { return i.$key; })).toEqual(['val1', 'val2', 'val3']);
                        expect(list2.map(function (i) { return i.$key; })).toEqual(['val2']);
                        done();
                    });
                })
                    .catch(done.fail);
            });
        });
        describe('endAt(value, key)', function () {
            it('should support the optional key parameter to endAt', function (done) {
                questions.$ref.ref.set({
                    val1: Object.assign({}, val1, { data: 0 }),
                    val2: Object.assign({}, val2, { data: 0 }),
                    val3: Object.assign({}, val3, { data: 0 })
                })
                    .then(function () {
                    var query1 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            endAt: { value: 0 }
                        }
                    });
                    var promise1 = toPromise.call(take.call(query1, 1));
                    var query2 = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'data',
                            endAt: { value: 0, key: 'val2' }
                        }
                    });
                    var promise2 = toPromise.call(take.call(query2, 1));
                    Promise.all([promise1, promise2]).then(function (_a) {
                        var list1 = _a[0], list2 = _a[1];
                        expect(list1.map(function (i) { return i.$key; })).toEqual(['val1', 'val2', 'val3']);
                        expect(list2.map(function (i) { return i.$key; })).toEqual(['val1', 'val2']);
                        done();
                    });
                })
                    .catch(done.fail);
            });
        });
        describe('observable queries (issue #830)', function () {
            it('should not emit the results of previous queries', function (done) {
                questions.$ref.ref.set({
                    key1: { even: false, value: 1 },
                    key2: { even: true, value: 2 }
                })
                    .then(function () {
                    var subject = new Subject();
                    var query = FirebaseListFactory(app.database().ref("questions"), {
                        query: {
                            orderByChild: 'even',
                            equalTo: subject
                        }
                    });
                    query = map.call(query, function (list, index) {
                        switch (index) {
                            case 0:
                                subject.next(true);
                                break;
                            case 1:
                                questions.$ref.ref.update({
                                    key3: { even: false, value: 3 },
                                    key4: { even: true, value: 4 }
                                });
                                break;
                            default:
                                break;
                        }
                        return list;
                    });
                    query = take.call(query, 3);
                    query = toArray.call(query);
                    toPromise.call(query).then(function (emits) {
                        expect(emits.map(function (e) { return e.map(function (i) { return i.$key; }); })).toEqual([
                            ['key1'],
                            ['key2'],
                            ['key2', 'key4']
                        ]);
                        done();
                    });
                    subject.next(false);
                })
                    .catch(done.fail);
            });
        });
    });
});
function skipAndTake(obs, takeCount, skipCount) {
    if (takeCount === void 0) { takeCount = 1; }
    if (skipCount === void 0) { skipCount = 0; }
    return take.call(skip.call(obs, skipCount), takeCount);
}
//# sourceMappingURL=firebase_list_factory.spec.js.map