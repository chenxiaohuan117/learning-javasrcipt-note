/**
 * 2. 队列
 * 队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。
 * 队列在尾部添加新元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾。
 * */

// 2.1 创建一个队列
class Queue {
	constructor() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
	// 向队列中添加元素
	enqueue(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 从队列中移除元素
	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}
		const res = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		return res;
	}
	// 查看队列头元素
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.lowestCount];
	}
	// 检测队列是否为空
	isEmpty() {
		return this.count - this.lowestCount === 0;
	}
	// 获取队列的长度
	size() {
		return this.count - this.lowestCount;
	}
	// 清空队列
	clear() {
		this.items = {};
		this.count = 0;
		this.lowestCount = 0;
	}
	// 实现toString方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		let objStr = `${this.items[this.lowestCount]}`;
		for (let i = this.lowestCount + 1; i < this.count; i++) {
			objStr = `${objStr}, ${this.items[i]}`;
		}
		return objStr;
	}
}
