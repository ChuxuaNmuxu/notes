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

console.log(5, cat([1, 2, 3], [3, 4], [5]))
