> 问题描述

假设n为正整数，斐波那契数列定义为： 
f(n) = 1, n < 3; 
f(n) = f(n-1) + f(n-2), n>=3 

现在请你来计算f(n)的值，但是不需要给出精确值，只要结果的后六位即可

输入：一行，包含一个正整数n，且0<n<1000 
输出：一行，f(n)的后6位（十进制，不足6位不补零）  

```js
//解决大整数相加精度丢失的问题，如8944394323791464+5527939700884757=14472334024676220
//~是js里的按位取反操作符，~~就是执行两次按位取反，其实就是保持原值，但是注意虽然是原值，但是对布尔型变量执行这个操作，会转化成相应的数值型变量，也就是 ~~true === 1，~~false === 0
//true+12 = 13
function bigNumberAdd(a,b) {
    var res = '', c = 0;
    a = String(a).split('');
    b = String(b).split('');
    while (a.length || b.length || c) {
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c > 9;
    }
    return res.replace(/^0+/, '');
}
//尾递归优化
function tco(f){
	let value;
    let active = false;
    let accumulated = [];
    return function accumulator(){
        accumulated.push(arguments)
        if(!active){
            active = true
            while(accumulated.length){
                value =  f.apply(this,accumulated.shift())
            }
            active  = false
            return value
        }
    }
}
let fn = tco(function(n , ac1 = 0 , ac2 = 1) {
   // if(n <=0 || n>=1000) return false;
    if(n <= 1) {
        if(String(ac2).length > 6){
            if(String(ac2).indexOf('e') > 0){
                return String(ac2).match(/[.\d]*(?=e)/)[0].substr(-6)
            }else{
                return String(ac2).substr(-6)
            }
        }
        return ac2
    }
    if(String(ac2).length > 15){
        return fn(n-1,ac2,bigNumberAdd(ac1,ac2))
    }
    return fn (n - 1, ac2, ac1 + ac2);
})

fn(10000)//366875
```

