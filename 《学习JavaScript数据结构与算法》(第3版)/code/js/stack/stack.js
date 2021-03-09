/**
 * 1. 栈
 * 栈是一种遵从后进先出（LIFO）原则的有序集合。
 * 新添加或待删除的元素都保存在栈的同一端，称为栈顶；另一端就叫栈底。
 * 在栈里，新元素都靠近栈顶，旧元素都接近栈底。
 * */

// 1.1 创建一个基于JavaScript数组的栈
class StackArray {
	constructor() {
		this.items = [];
	}
	// 向栈中添加元素
	push(element) {
		this.items.push(element);
	}
	// 从栈中移除元素
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items.pop();
	}
	// 查看栈顶元素
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.items.length - 1];
	}
	// 检查栈是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取栈的长度
	size() {
		return this.items.length;
	}
	// 清空栈元素
	clear() {
		this.items = [];
	}
}

// 1.2 创建一个基于JavaScript对象的栈
class Stack {
	constructor() {
		this.count = 0;
		this.items = {};
	}
	// 向栈中添加元素
	push(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 从栈中移除元素
	pop() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--;
		const result = this.items[this.count];
		delete this.items[this.count];
		return result;
	}
	// 查看栈顶元素
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.count - 1];
	}
	// 检查栈是否为空
	isEmpty() {
		return this.count === 0;
	}
	// 获取栈的长度
	size() {
		return this.count;
	}
	// 清空栈元素
	clear() {
		this.items = {};
		this.count = 0;
	}
}
