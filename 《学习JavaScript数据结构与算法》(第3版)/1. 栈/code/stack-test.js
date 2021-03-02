// 用栈解决问题

// 1.十进制转换为二进制
function decimalToBinary(decNum){
	const remStack = new Stack();
	let rem, bryStr = '';
	while(decNum > 0){
		rem = Math.floor(decNum % 2);
		remStack.push(rem);
		decNum = Math.floor(decNum / 2);
	}
	while(!remStack.isEmpty()){
		bryStr += remStack.pop();
	}
	return bryStr;
}

// 2.十进制转换成基数为2~36的任意进制
function baseConverter(decNum, base){
	const remStack = new Stack();
	const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let rem, baseStr = '';
	if(!(base >= 2 && base <= 36)){
		return '';
	}
	while(decNum > 0){
		rem = Math.floor(decNum % base);
		remStack.push(rem);
		decNum = Math.floor(decNum / base);
	}
	while(!remStack.isEmpty()){
		baseStr += digits[remStack.pop()];
	}
	return baseStr;
}
