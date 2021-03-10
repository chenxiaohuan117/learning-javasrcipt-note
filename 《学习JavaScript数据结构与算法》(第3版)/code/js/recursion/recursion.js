/**
 * 6. 递归
 * 递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。
 * 每个递归函数都必须有基线条件，即一个不再递归调用的条件（停止点），以防止无限递归。
 * 
 * 1）调用栈
 * 在程序运行时，计算机会为应用程序分配一定的内存空间，
 * 应用程序则会自行分配所获得的内存空间，
 * 其中一部分被用于记录程序中正在调用的各个函数的运行情况，这就是函数的调用栈。
 * 常规的函数调用总是会在调用栈最上层添加一个新的堆栈帧（stack frame，也称为“栈帧”或“帧”），
 * 这个过程被称作“入栈”或“压栈”（即把新的帧压在栈顶）。
 * 当函数的调用层数非常多时，调用栈会消耗不少内存，
 * 甚至会撑爆内存空间（栈溢出，stack overflow），造成程序严重卡顿或意外崩溃。
 * 
 * 2）ES6尾调用优化（tail call optimization）
 * 尾调用优化不再创建新的栈帧，而是清除并重用当前栈帧，所以可以帮助函数保持更小的调用栈，减少内存的使用，避免栈溢出错误。
 * 对于递归函数，如果没有尾调用优化，持续递归一段时间后，由于递归调用次数多，会导致调用栈溢出，引发错误。
 * 进行优化后，调用栈中只会存在一个栈帧，避免栈溢出错误。
 * 在进行编写递归函数时，利用尾调用优化的特性优化递归函数，将会提升程序的性能。
 * 
 * 3）ES6尾调用优化需满足三个条件：
 * 尾调用不访问当前栈帧的变量；
 * 在函数内部，尾调用是最后一条语句；
 * 尾调用的结果作为函数值返回。
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
// function factorial(n) {
// 	if (n < 0) {
// 		return undefined;
// 	}
// 	if (n <= 1) {
// 		return 1;
// 	}
// 	return n * factorial(n - 1);
// }

// 尾调用优化
function factorial(n, p = 1) {
	if (n < 0) {
		return undefined;
	}
	if (n <= 1) {
		return 1 * p;
	}
	let res = n * p
	return factorial(n - 1, res);
}

// 6.2 斐波那契数列
/**
 * 斐波那契数列的定义如下：
 * 它是一个由0、1、1、2、3、5、8、13、21、34等数组成的序列。
 * 位置0的斐波那契数是0，
 * 位置1和2的斐波那契数是1，
 * 位置n（n > 2）的斐波那契数是位置（n - 1）的斐波那契数加上位置（n - 2）的斐波那契数。
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

// 方法3: 记忆化斐波那契数（记忆化是一种保存前一个结果的值的优化技术,类似于缓存）
function fibonacciMemoization() {
	const memo = [0, 1];
	const fibonacci = n => {
		if (memo[n] != null) return memo[n];
		return memo[n] = fibonacci(n - 2, memo) + fibonacci(n - 1, memo);
	}
	return fibonacci;
}
