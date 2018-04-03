import * as utils from './utils';
describe('utils', function () {
    describe('isString', function () {
        it('should be able to properly detect a string', function () {
            var str = 'oh hai';
            var notStr = 101;
            var bool = true;
            var nul = null;
            var obj = {};
            var fn = function () { };
            var undef;
            expect(utils.isString(str)).toBe(true);
            expect(utils.isString(notStr)).toBe(false);
            expect(utils.isString(bool)).toBe(false);
            expect(utils.isString(nul)).toBe(false);
            expect(utils.isString(fn)).toBe(false);
            expect(utils.isString(undef)).toBe(false);
        });
    });
});
//# sourceMappingURL=utils.spec.js.map