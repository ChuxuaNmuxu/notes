/**
 * Created by Simiao on 2017/3/4.
 */

/**
 * Array.form ��������ת��������������
 * ֻҪ�ǲ�����Iterator�ӿڵ����ݽṹ��Array.from���ܽ���תΪ���顣
 * ��ν��������Ķ��󣬱�������ֻ��һ�㣬��������length���ԡ�
 * ��ˣ��κ���length���ԵĶ��󣬶�����ͨ��Array.from����תΪ���飬����ʱ��չ��������޷�ת��
 * ***/
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5��д��
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6
let arr2 = Array.from(arrayLike);

//��length���ԾͿ���ʹ��Array.from
let arr3 = Array.from({ length: 3})

//Array.from�����Խ��ܵڶ������������������������map������������ÿ��Ԫ�ؽ��д�����������ֵ���뷵�ص����顣
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
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)  //��3-4λ�滻��0λ��ʼ����


/**
 * Array.find( fn ) ���������е�һ��fn����trueʱ��ֵ
 * Array.findIndex�������÷���find�����ǳ����ƣ����ص�һ�����������������Ա��λ�ã�������г�Ա���������������򷵻�-1��
 * **/
let arr = [1, 3, 5, 6];
arr.find((x) => x > 5);



debugger