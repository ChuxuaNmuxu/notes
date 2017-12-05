import _ from 'underscore';

var LOG_COUNT = 1;

/**
 * 区分null，undifined和其他值
 * @param {*any} x 
 */
function existy (x) {
    return x != null;
}

console.log(LOG_COUNT++, existy(0))

/**
 * 有值
 * @param {*any} x 
 */
function truthy (x) {
    return existy(x) && (x !== false);
}

console.log(LOG_COUNT++, truthy(0))

/**
 * 某条件为真时执行操作，否则返回undefined
 * @param {*any} cond 条件
 * @param {*function} action 执行的操作
 */
function doWhen (cond, action) {
    if (truthy(cond)) 
        return action();
    else 
        return undefined;
}

/**
 * eg
 * @param {*any} target 
 * @param {*string} name 
 */
function excuteIfHasField (target, name) {
    return doWhen(target[name], function () {
        return _.result(target, name)
    })
}

console.log(LOG_COUNT++, excuteIfHasField([1, 2, 3], 'reverse'))
console.log(LOG_COUNT++, excuteIfHasField('123', 'reverse'))

console.log('******************* end of primer ******************')

/**
 * applicative编程： 以函数为参数
 * 定义一个函数，接受一个函数，然后调用它
 */

import _ from 'underscore';
import './primer';

function allOf () {
    return _.reduceRight(arguments, function (truth, f) {
        return truth && f()
    }, true)
}

function anyOf () {
    return _.reduceRight(arguments, function (truth, f) {
        return truth || f()
    }, false)
}

function cat () {
    var head = _.first(arguments);
    if (existy(head))
        return head.concat.apply(head, _.rest(arguments));
    else
        return [];
}

console.log(LOG_COUNT++, cat([1, 2, 3], [3, 4], [5]))

function construct (head, tail) {
    return cat([head], _.toArray(tail))
}

function mapcat (fun, coll) {
    return cat.apply(null, _.map(coll, fun))
}

console.log(LOG_COUNT++, mapcat(function (e) {
    return construct(e, ',');
}, [1, 2, 3]));

function butLast (coll) {
    return _.toArray(coll).slice(0, -1);
}

function interpose (inter, coll) {
    return butLast(mapcat(function (e) {
        return construct(e, [inter]);
    }, coll))
}

console.log(LOG_COUNT++, interpose(',', [1, 2, 3]))

console.log('******************* end of appliactive ******************')

/**
 * 作用域 & 闭包
 * 1.闭包会捕获一个值或引用，并多次返回相同的值
 * 2.每一个新的闭包都会捕获不一样的值
 */
function always (value) {
    return function () {
        return value
    }
}

var f = always(function () {});
console.log(LOG_COUNT++, f() === f());

var g = always(function () {});
console.log(LOG_COUNT++, f() === g());

/**
 * 接受一个方法，并在任何给定的对象上调用它
 */
function invoker (name, method) {
    return function (target) {
        if (!existy(target)) console.log('Must provide a target');

        const targetMethod = target[method];
        const args = _.rest(arguments);

        return doWhen((existy(targetMethod && method === targetMethod)), function () {
            return targetMethod.apply(target, args);
        })
    }
}

console.log('******************* end of closure ******************')

/**
 * 高阶函数
 */

/**
 * 找到最佳值
 */
function finder (valueFn, bestFn, coll) {
    return _.reduce(coll, function (current, best) {
        const currentValue = valueFn(current);
        const bestValue = valueFn(best);

        return best === bestFn(bestValue, currentValue) ? best : current;
    })
}

console.log(LOG_COUNT++, finder(_.identity, Math.max, [1, 23, 5, 3, 7]))

/**
 * finder 函数精简
 * 假设：bestFn知道如何分解参数，且是谓词
 */
function best (fun, coll) {
    return _.reduce(coll, function (current, best) {
        return fun(current, best) ? current : best
    })
}

console.log(LOG_COUNT++, best(function (x, y) {return x > y}, [1, 2, 3, 5]))

/**
 * 函数，带反馈系统更强大
 */


/**
 * 可变状态是危险的
 * 函数返回值是可预期的即引用透明
 */
function makeUniqueStringFn (start) {
    // count使用闭包来追踪当前值，变量安全，但导致函数输出不可预期，增加复制度
    var count = start;

    return function (prefix) {
        return [prefix, start++].join('');
    }
}

function fnull (fun) {
    var defaults = _.rest(arguments);

    // 高阶函数，修饰器模式
    return function () {
        var args = _.map(arguments, function (e, i) {
            return existy(e) ? e : defaults[i];
        })

        return fun.apply(null, args);
    }
}

var nums = [1, 2, 3, null, 5];
var safeMult = fnull(function (total, n) {
    return total * n
}, 1, 1);

console.log(LOG_COUNT++, safeMult(null, 10));
console.log(LOG_COUNT++, _.reduce(nums, safeMult));

/**
 * 对象校验器
 */
function checker () {
    var validators = _.toArray(arguments);

    return function (obj) {
        return _.reduce(validators, function (errors, check) {
            if (check(obj))
                return errors;
            else
                return _.chain(errors).push(check.message).value();
        }, [])
    }
}

var alwaysPass = checker(always(true), always(true));
console.log(LOG_COUNT++, alwaysPass({}));

var fails = always(false);
fails.message = 'a failure in life';
var alwaysFails = checker(fails, fails);
console.log(LOG_COUNT++, alwaysFails({}))

function validator (message, fun) {
    var f = function () {
        return fn.apply(null, arguments);
    }

    f['message'] = message;
    return f;
}
