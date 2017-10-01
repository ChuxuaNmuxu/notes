/**
 * Created by Simiao on 2017/3/4.
 */

/**
 * Array.form 将类数组转换成真正的数组
 * 只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。
 * 所谓类似数组的对象，本质特征只有一点，即必须有length属性。
 * 因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换
 * ***/
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6
let arr2 = Array.from(arrayLike);

//有length属性就可以使用Array.from
let arr3 = Array.from({ length: 3})

//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
let arrayLike2 = {
    0: 0,
    1: 2,
    2: 3,
    length: 3
}
let arr4 = Array.from(arrayLike2, x => x * x);

/*************************************************************/


/**
 * Array.copyWithin
 * **/
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)  //将3-4位替换到0位开始往后


/**
 * Array.find( fn ) 返回数组中第一个fn返回true时的值
 * Array.findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
 * **/
let arr = [1, 3, 5, 6];
arr.find((x) => x > 5);



debugger