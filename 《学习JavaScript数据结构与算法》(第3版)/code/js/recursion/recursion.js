/**
 * 6. 递归
 * 递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。
 * 每个递归函数都必须有基线条件，即一个不再递归调用的条件（停止点），以防止无限递归。
 * 
 * 调用栈
 * 每当一个函数被一个算法调用时，该函数会进入调用栈的顶部。
 * 当使用递归的时候，每个函数调用都会堆叠在调用栈的顶部，这是因为每个调用都可能依赖前一个调用的结果。
 * 
 * JavaScript调用栈大小的限制
 * 如果没有加停止递归的基线条件，递归并不会无限制地执行下去，浏览器会抛出错误，即栈溢出错误（stack overflow error）。
 * 
 * ES6有尾部调用优化（tail call optimization）
 * 如果函数内的最后一个操作是调用函数，会通过“跳转指令”（jump）而不是“子程序调用”（subroutine call）来控制。
 * 就是说，在ES6中，这里的代码可以一直执行下去。因此，具有停止递归的基线条件非常重要。
 * 
 * 为什么用递归？
 * 相同执行条件下，迭代要比递归快，但递归代码更容易理解，代码通常也更少。
 * 另外，对于一些算法来说，迭代的解法可能不可用，而且有了尾部调用优化，递归的多余消耗可能会被消除。
 * 所以，使用递归来解决问题会更简单。
 * */

// 6.1 计算一个数的阶乘

// 方法1: 迭代阶乘
function factorialIterative(number) {
	if (number < 0) {
		return undefined;
	}
	let total = 1;
	for (let n = number; n > 1; n--) {
		total = total * n;
	}
	return total;
}

// 方法2: 递归阶乘
function factorial(n) {
	if (n < 0) {
		return undefined;
	}
	if (n === 1 || n === 0) {
		return 1;
	}
	return n * factorial(n - 1);
}

// 6.2 斐波那契数列
/**
 * 斐波那契数列的定义如下：
 * 它是一个由0、1、1、2、3、5、8、13、21、34等数组成的序列。
 * 位置0的斐波那契数是零；
 * 位置1和2的斐波那契数是1；
 * 位置n（n > 2）的斐波那契数是（n - 1）的斐波那契数加上（n - 2）的斐波那契数。
 * */

// 方法1: 迭代求斐波那契数
function fibonacciIterative(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	let fibNum1 = 0;
	let fibNum2 = 1;
	let fibN = n;
	for (let i = 2; i <= n; i++) {
		fibN = fibNum1 + fibNum2;
		fibNum1 = fibNum2;
		fibNum2 = fibN;
	}
	return fibN;
}

// 方法2: 递归求斐波那契数
function fibonacci(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	return fibonacci(n - 2) + fibonacci(n - 1);
}

// 方法3: 记忆化斐波那契数（记忆化是一种保存前一个结果的值得优化技术,类似于缓存）
function fibonacciMemoization() {
	const memo = [0, 1];
	const fibonacci = n => {
		if (memo[n] != null) return memo[n];
		return memo[n] = fibonacci(n - 2, memo) + fibonacci(n - 1, memo);
	}
	return fibonacci;
}
