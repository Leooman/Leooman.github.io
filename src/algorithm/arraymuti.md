1/一个整型数组，删除其中一个元素使得剩余元素乘积最大，找出待删除的元素

2/给定一个整数，找出距离最近的$2^n$

```js
function get(number){
		function _getMin(n){
			if(n & n - 1){
				return _getMin(n - 1)
			}else{
				return n
			}
		}
		function _getMax(n){
			if(n & n + 1){
				return _getMax(n + 1)
			}else{
				return n + 1
			}
		}
		let max = _getMax(number)
		let min = _getMin(number)
		return max - number > number - min ? min : max
}
console.log(get(24))
```

