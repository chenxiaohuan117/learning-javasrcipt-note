/**
 * 双端队列（deque，或称double-ended queue）
 * 是一种允许我们同时从前端和后端添加和移除元素的特殊队列。
 * 双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。
 * */

// 创建一个双端队列
class Deque {
	constructor() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
	// 在双端队列前端添加新的元素
	addFront(element) {
		if (this.isEmpty()) {
			this.addBack(element);
		} else if (this.lowestCount > 0) {
			this.lowestCount--;
			this.items[this.lowestCount] = element;
		} else {
			for (let i = this.count; i > 0; i--) {
				this.items[i] = this.items[i - 1];
			}
			this.count++;
			this.items[0] = element;
		}
	}
	// 在双端队列后端添加新的元素
	addBack(element) {
		this.items[this.count] = element;
		this.count++;
	}
	// 从双端队列前端移除第一个元素
	removeFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		const res = this.items[this.lowestCount];
		delete this.items[this.lowestCount];
		this.lowestCount++;
		return res;
	}
	// 从双端队列后端移除第一个元素
	removeBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		this.count--;
		const res = this.items[this.count];
		delete this.items[this.count];
		return res;
	}
	// 返回双端队列前端的第一个元素
	peekFront() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.lowestCount];
	}
	// 返回双端队列后端的第一个元素
	peekBack() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.count - 1];
	}
	// 检查队列是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取队列的长度
	size() {
		return this.count - this.lowestCount;
	}
	// 清空队列元素
	clear() {
		this.count = 0;
		this.lowestCount = 0;
		this.items = {};
	}
	// 创建toString方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		let objStr = `${this.items[this.lowestCount]}`;
		for (let i = this.lowestCount + 1; i < this.count; i++) {
			objstr = `${objStr}, S{this.items[i]}`;
		}
		return objStr;
	}
}
