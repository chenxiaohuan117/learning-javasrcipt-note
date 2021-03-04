/**
 * 链表，是存储有序的元素集合。
 * 不同于数组，链表中的元素在内存中并不是连续放置的。
 * 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
 * 相对于数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。
 * 在数组中，我们可以直接访问任何位置的任何元素，
 * 而要想访问链表中间的一个元素，则需要从起点（表头）开始迭代链表直到找到所需的元素。
 * */

// 创建链表
class LinkedList {
	constructor(equalsFn = defaultEquals) {
		this.count = 0;
		this.head = undefined;
		this.equalsFn = equalsFn;
	}
	// 向链表尾部添加一个新元素
	push(element) {
		const node = new Node(element);
		let current;
		if (!this.head) {
			this.head = node;
		} else {
			current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.count++;
	}
	// 向链表中的特定位置插入一个新元素
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new Node(element);
			if (index === 0) {
				const current = this.head;
				node.next = current;
				this.head = node;
			} else {
				const previous = this.getElementAt(index - 1);
				node.next = previous.next;
				previous.next = node;
			}
			this.count++;
			return true;
		}
		return false;
	}
	// 获取链表中特定位置的元素
	getElementAt(index) {
		if (index >= 0 && index <= this.count) {
			let node = this.head;
			for (let i = 0; i < index && node; i++) {
				node = node.next;
			}
			return node;
		}
		return undefined;
	}
	// 从特定位置移除一个元素
	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = current.next;
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
	// 根据元素的值移除元素
	remove(element) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}
	// 获取元素在链表中的索引
	indexOf(element) {
		let current = this.head;
		for (let i = 0; i < this.size() && current; i++) {
			if (this.equalsFn(element, current.element)) {
				return i;
			}
			current = current.next;
		}
		return -1;
	}
	// 检查链表是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取链表的长度
	size() {
		return this.count;
	}
	// 获取链表的头元素
	getHead() {
		return this.head;
	}
	// 清除链表元素
	clear() {
		this.head = undefined;
		this.count = 0;
	}
	// 实现toString方法
	toString() {
		if (!this.head) {
			return '';
		}
		let objStr = `${this.head.element}`;
		let current = this.head.next;
		for (let i = 1; i < this.size() && current; i++) {
			objStr = `${objStr}, ${current.element}`;
			current = current.next;
		}
		return objStr;
	}
}
