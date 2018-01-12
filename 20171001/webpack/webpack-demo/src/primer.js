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

        const targetMethod = target[name];
        const args = _.rest(arguments);

        return doWhen((truthy(targetMethod && method === targetMethod)), function () {
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
        return fun.apply(null, arguments);
    }

    f['message'] = message;
    return f;
}

console.log('******************* end of HOF ******************')

/**
 * 由函数构建函数
 */

/**
 * 依次运行函数直至返回非undefined
 */
function dispatch () {
    var funs = _.toArray(arguments);
    var size = funs.length;

    return function () {
        var args = _.toArray(arguments)
        var ret = undefined;

        for (var i = 0; i < size; i++) {
            var fun = funs[i];
            ret = fun.apply(fun, args);

            if (existy(ret)) return ret;
        }

        return ret;
    }
}

var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));
console.log(LOG_COUNT++, str('AI'), str(['a', 'i']))

/**
 * currying
 */
function rightAwayInvoker () {
    var args = _.toArray(arguments);
    var method = args.shift();
    var target = args.shift();

    return method.apply(target, args);
}

console.log(LOG_COUNT++, rightAwayInvoker(Array.prototype.reverse, [1, 2, 3], [3, 4]))

// 接受一个函数，返回一个只接受一个参数的函数
function curry (fun) {
    return function (arg) {
        return fun(arg);
    }
}

console.log(LOG_COUNT++, ['1', '11'].map(curry(parseInt)));

function curry2 (fun) {
    return function (secondArg) {
        return function (firstArg) {
            return fun(firstArg, secondArg);
        }
    }
}

// 柯里化流利的api
var greaterThan = curry2(function (lhs, rhs) {return lhs > rhs});
var lessThan = curry2(function (lhs, rhs) {return lhs < rhs});

var withinRange = checker(
    validator('greater than 10', greaterThan(10)),
    validator('less than 20', lessThan(20))
)
console.log(LOG_COUNT++, withinRange(12), withinRange(45));

//部分应用与柯里化
function partial (fun) {
    var pargs = _.rest(arguments);

    return function () {
        var args = cat(pargs, _.toArray(arguments));

        return fun.apply(fun, args);
    }
}

// 前置条件：函数的调用者的担保
var zero = validator('cannot be zero', function (n) {return 0 === n});
var number = validator('must be number', _.isNumber);

function sqr (n) {
    if (zero(n)) throw new Error(zero.message);
    if (!number(n)) throw new Error(number.message);

    return n * n;
}

console.log(LOG_COUNT++, sqr(3));

function condition1 () {
    var validators = _.toArray(arguments);

    return function (fun, arg) {
        var errors = mapcat(function (isValid) {
            return isValid(arg) ? [] : [isValid.message];
        }, validators);

        if (!_.isEmpty(errors)) throw new Error(errors.join(', '));

        return fun(arg);
    }
}

var sqrPre = condition1(zero, number);

// console.log(LOG_COUNT++, sqrPre(function () {return n * n}, 2));

function uncheckedSqr (n) {
    return n * n;
}

var checkedSqr = partial(sqrPre, uncheckedSqr);
var sillySqr = partial(condition1(validator('should be string', _.isString)), checkedSqr);


/*
    递归
*/
function andify () {
    var preds = _.toArray(arguments);

    return function () {
        var args = _.toArray(arguments);

        var everything = function (ps, truth) {
            if (_.isEmpty(ps))
                return truth;
            else 
                return _.every(args, _.first(ps)) && everything(_.rest(ps), truth)
        }

        return everything(preds, true);
    }
}
