/**
 * Created by Simiao on 2017/3/2.
 */
var str = 'hello world';
//str.startsWith('hello');
//str.endsWith('ld');
//str.includes('ll');
//
//str.repeat(3);
//
//'x'.padStart(5, 'ab')  //error 没有这个函数？


/*
* 字符串模板
* */
let name = `leo `, date = 'today';
console.log(`hello ${name},
how are you ${date}`);   //换行会被保留
                        //变量写在${}  {}内可以是js

let a = 1, b = 2;
console.log(`${a + b}`);

const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));

document.getElementById('wrap').innerHTML = `
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
`

var total = 30;
var msg = passthru`The total is ${total} (${total*1.05} with tax)`;

function passthru(literals) {
    var result = '';
    var i = 0;
debugger
    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }

    return result;
}

msg



debugger