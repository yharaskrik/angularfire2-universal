import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { getOrderObservables, observeQuery } from 'angularfire2/database-deprecated';
function scalarQueryTest(query, done) {
    var queryObservable = observeQuery(query);
    queryObservable.subscribe(function (result) {
        expect(result).toEqual(query);
        done();
    });
}
function observableQueryTest(query, nextProp, done) {
    var queryObservable = observeQuery(query);
    var toMerge = {};
    queryObservable.subscribe(function (result) {
        var merged = Object.assign(query, toMerge);
        expect(result).toEqual(merged);
        done();
    });
    Object.keys(nextProp).forEach(function (prop) {
        query[prop].next(nextProp[prop]);
        toMerge[prop] = nextProp[prop];
    });
}
describe('observeQuery', function () {
    var resultQuery = { orderByKey: true, startAt: null, endAt: null, equalTo: null };
    it('should return an observable', function () {
        expect(observeQuery({}) instanceof Observable).toBe(true);
    });
    it('should immediately emit a query object if passed a POJO with only scalar values', function () {
        var nextSpy = jasmine.createSpy('next');
        var completeSpy = jasmine.createSpy('complete');
        var query = { orderByChild: 'height', equalTo: 10 };
        var obs = observeQuery(query, false);
        obs.subscribe(nextSpy, function () { }, completeSpy);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'height',
            equalTo: 10
        });
    });
    it('should return null if called with no query', function () {
        var nextSpy = jasmine.createSpy('next');
        var completeSpy = jasmine.createSpy('complete');
        var query = null;
        var obs = observeQuery(query, false);
        obs.subscribe(nextSpy, function () { }, completeSpy);
        expect(nextSpy).toHaveBeenCalledWith(null);
        expect(completeSpy).toHaveBeenCalled();
    });
    it('should emit an updated query if an attached observable emits new value', function () {
        var nextSpy = jasmine.createSpy('next');
        var completeSpy = jasmine.createSpy('complete');
        var query = {
            orderByKey: new Subject()
        };
        var obs = observeQuery(query, false);
        var noOrderyQuery = { orderByKey: false };
        obs.subscribe(nextSpy, function () { }, completeSpy);
        query.orderByKey.next(true);
        expect(nextSpy).toHaveBeenCalledWith({ orderByKey: true });
        nextSpy.calls.reset();
        expect(completeSpy).not.toHaveBeenCalled();
        query.orderByKey.next(false);
        expect(nextSpy).toHaveBeenCalledWith(noOrderyQuery);
    });
    it('should omit a key from the query if its observable emits null', function () {
        var nextSpy = jasmine.createSpy('next');
        var completeSpy = jasmine.createSpy('complete');
        var query = {
            orderByKey: new Subject()
        };
        var obs = observeQuery(query, false);
        obs.subscribe(nextSpy, function () { }, completeSpy);
        query.orderByKey.next(true);
        expect(nextSpy).toHaveBeenCalledWith({ orderByKey: true });
        nextSpy.calls.reset();
        query.orderByKey.next(null);
        expect(nextSpy).toHaveBeenCalledWith({});
    });
    it('should omit only the orderBy type of the last emitted orderBy observable', function () {
        var nextSpy = jasmine.createSpy('next');
        var query = {
            orderByKey: new Subject(),
            orderByPriority: new Subject(),
            orderByValue: new Subject(),
            orderByChild: new Subject()
        };
        var obs = observeQuery(query, false);
        obs.subscribe(nextSpy);
        query.orderByChild.next('height');
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'height'
        });
        nextSpy.calls.reset();
        query.orderByKey.next(true);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByKey: true
        });
        nextSpy.calls.reset();
        query.orderByValue.next(true);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByValue: true
        });
        nextSpy.calls.reset();
        query.orderByChild.next('foo');
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'foo'
        });
    });
});
describe('getOrderObservables', function () {
    it('should be subscribable event if no observables found for orderby', function () {
        var nextSpy = jasmine.createSpy('next');
        var obs = getOrderObservables({});
        obs.subscribe(nextSpy);
        expect(nextSpy).toHaveBeenCalledWith(null);
    });
});
describe('query combinations', function () {
    describe('orderByChild', function () {
        it('should build an equalTo query with scalar values', function (done) {
            scalarQueryTest({
                orderByChild: 'height',
                equalTo: 94
            }, done);
        });
        it('should build an equalTo query with an observable', function (done) {
            var query = {
                orderByChild: 'height',
                equalTo: new Subject()
            };
            observableQueryTest(query, { equalTo: 92 }, done);
        });
        it('should build a startAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByChild: 'height',
                startAt: 94
            }, done);
        });
        it('should build a startAt query with an observable', function (done) {
            var query = {
                orderByChild: 'height',
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 92 }, done);
        });
        it('should build a endAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByChild: 'height',
                endAt: 94
            }, done);
        });
        it('should build a endAt query with an observable', function (done) {
            var query = {
                orderByChild: 'height',
                endAt: new Subject()
            };
            observableQueryTest(query, { endAt: 92 }, done);
        });
        it('should build a startAt().endAt() query with scalar values', function (done) {
            scalarQueryTest({
                orderByChild: 'height',
                startAt: 32,
                endAt: 94
            }, done);
        });
        it('should build a startAt().endAt() query with an observable', function (done) {
            var query = {
                orderByChild: 'height',
                endAt: new Subject(),
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 32, endAt: 92 }, done);
        });
    });
    describe('orderByKey', function () {
        it('should build an equalTo query with scalar values', function (done) {
            scalarQueryTest({
                orderByKey: true,
                equalTo: 94
            }, done);
        });
        it('should build an equalTo query with an observable', function (done) {
            var query = {
                orderByKey: true,
                equalTo: new Subject()
            };
            observableQueryTest(query, { equalTo: 92 }, done);
        });
        it('should build a startAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByKey: true,
                startAt: 94
            }, done);
        });
        it('should build a startAt query with an observable', function (done) {
            var query = {
                orderByKey: true,
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 92 }, done);
        });
        it('should build a endAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByKey: true,
                endAt: 94
            }, done);
        });
        it('should build a endAt query with an observable', function (done) {
            var query = {
                orderByKey: true,
                endAt: new Subject()
            };
            observableQueryTest(query, { endAt: 92 }, done);
        });
        it('should build a startAt().endAt() query with scalar values', function (done) {
            scalarQueryTest({
                orderByKey: true,
                startAt: 32,
                endAt: 94
            }, done);
        });
        it('should build a startAt().endAt() query with an observable', function (done) {
            var query = {
                orderByKey: true,
                endAt: new Subject(),
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 32, endAt: 92 }, done);
        });
    });
    describe('orderByValue', function () {
        it('should build an equalTo query with scalar values', function (done) {
            scalarQueryTest({
                orderByValue: true,
                equalTo: 21
            }, done);
        });
        it('should build an equalTo query with an observable', function (done) {
            var query = {
                orderByValue: true,
                equalTo: new Subject()
            };
            observableQueryTest(query, { equalTo: 43 }, done);
        });
        it('should build a startAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByValue: true,
                startAt: 25
            }, done);
        });
        it('should build a startAt query with an observable', function (done) {
            var query = {
                orderByValue: true,
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 11 }, done);
        });
        it('should build a endAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByValue: true,
                endAt: 94
            }, done);
        });
        it('should build a endAt query with an observable', function (done) {
            var query = {
                orderByValue: true,
                endAt: new Subject()
            };
            observableQueryTest(query, { endAt: 43 }, done);
        });
        it('should build a startAt().endAt() query with scalar values', function (done) {
            scalarQueryTest({
                orderByValue: true,
                startAt: 32,
                endAt: 94
            }, done);
        });
        it('should build a startAt().endAt() query with an observable', function (done) {
            var query = {
                orderByValue: true,
                endAt: new Subject(),
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 7, endAt: 12 }, done);
        });
    });
    describe('orderByPriority', function () {
        it('should build an equalTo query with scalar values', function (done) {
            scalarQueryTest({
                orderByPriority: true,
                equalTo: 21
            }, done);
        });
        it('should build an equalTo query with an observable', function (done) {
            var query = {
                orderByPriority: true,
                equalTo: new Subject()
            };
            observableQueryTest(query, { equalTo: 43 }, done);
        });
        it('should build a startAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByPriority: true,
                startAt: 25
            }, done);
        });
        it('should build a startAt query with an observable', function (done) {
            var query = {
                orderByPriority: true,
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 11 }, done);
        });
        it('should build a endAt query with scalar values', function (done) {
            scalarQueryTest({
                orderByPriority: true,
                endAt: 94
            }, done);
        });
        it('should build a endAt query with an observable', function (done) {
            var query = {
                orderByPriority: true,
                endAt: new Subject()
            };
            observableQueryTest(query, { endAt: 43 }, done);
        });
        it('should build a startAt().endAt() query with scalar values', function (done) {
            scalarQueryTest({
                orderByPriority: true,
                startAt: 32,
                endAt: 94
            }, done);
        });
        it('should build a startAt().endAt() query with an observable', function (done) {
            var query = {
                orderByPriority: true,
                endAt: new Subject(),
                startAt: new Subject()
            };
            observableQueryTest(query, { startAt: 7, endAt: 12 }, done);
        });
    });
});
describe('null values', function () {
    it('should build an equalTo() query with a null scalar value', function (done) {
        scalarQueryTest({
            orderByChild: 'height',
            equalTo: null
        }, done);
    });
    it('should build a startAt() query with a null scalar value', function (done) {
        scalarQueryTest({
            orderByChild: 'height',
            startAt: null
        }, done);
    });
    it('should build an endAt() query with a null scalar value', function (done) {
        scalarQueryTest({
            orderByChild: 'height',
            endAt: null
        }, done);
    });
    it('should build an equalTo() query with a null observable value', function (done) {
        var query = {
            orderByChild: 'height',
            equalTo: new Subject()
        };
        observableQueryTest(query, { equalTo: null }, done);
    });
    it('should build a startAt() query with a null observable value', function (done) {
        var query = {
            orderByChild: 'height',
            startAt: new Subject()
        };
        observableQueryTest(query, { startAt: null }, done);
    });
    it('should build an endAt() query with a null observable value', function (done) {
        var query = {
            orderByChild: 'height',
            endAt: new Subject()
        };
        observableQueryTest(query, { endAt: null }, done);
    });
});
describe('audited queries', function () {
    it('should immediately emit if not audited', function () {
        var nextSpy = jasmine.createSpy('next');
        var query = { orderByChild: 'height', startAt: new Subject(), endAt: new Subject() };
        var obs = observeQuery(query, false);
        obs.subscribe(nextSpy);
        query.startAt.next(5);
        expect(nextSpy).not.toHaveBeenCalled();
        query.endAt.next(10);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'height',
            startAt: 5,
            endAt: 10
        });
        query.startAt.next(10);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'height',
            startAt: 10,
            endAt: 10
        });
        query.endAt.next(15);
        expect(nextSpy).toHaveBeenCalledWith({
            orderByChild: 'height',
            startAt: 10,
            endAt: 15
        });
    });
    it('should emit the last query (in the event loop) if audited', function (done) {
        var emits = 0;
        var query = { orderByChild: 'height', startAt: new Subject(), endAt: new Subject() };
        var obs = observeQuery(query, true);
        obs.subscribe(function (result) {
            switch (++emits) {
                case 1:
                    expect(result).toEqual({
                        orderByChild: 'height',
                        startAt: 5,
                        endAt: 10
                    });
                    query.startAt.next(10);
                    query.endAt.next(15);
                    break;
                case 2:
                    expect(result).toEqual({
                        orderByChild: 'height',
                        startAt: 10,
                        endAt: 15
                    });
                    done();
                    break;
            }
        });
        query.startAt.next(5);
        query.endAt.next(10);
    });
});
//# sourceMappingURL=query_observable.spec.js.map