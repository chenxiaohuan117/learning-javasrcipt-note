/**
 * 双向链表
 * 在双向链表中，链接是双向的，一个链向下一个元素，一个链向前一个元素。
 * 双向链表提供了两种迭代方法：从头到尾或者从尾到头。
 * 我们也可以访问一个特定节点的下一个或前一个元素。
 * 双向链表可以直接获取头尾的元素，减少过程消耗。
 * */

// 创建双向链表
class DoublyLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals) {
		super(equalsFn);
		this.tail = undefined;
	}
	// 向链表尾部添加一个新元素
	push(element) {
		const node = new DoublyNode(element);
		if (!this.head) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.count++;
	}
	// 向链表中的特定位置插入一个新元素
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new DoublyNode(element);
			let current = this.head;
			if (index === 0) {
				if (!this.head) {
					this.head = node;
					this.tail = node;
				} else {
					node.next = this.head;
					this.head.prev = node;
					this.head = node;
				}
			} else if (index === this.count) {
				current = this.tail;
				current.next = node;
				node.prev = current;
				this.tail = node;
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				node.next = current;
				previous.next = node;
				current.prev = node;
				node.prev = previous;
			}
			this.count++;
			return true;
		}
		return false;
	}
	// 从特定位置移除一个元素
	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = this.head.next;
				if (this.count === 1) {
					this.tail = undefined;
				} else {
					this.head.prev = undefined;
				}
			} else if (index === this.count - 1) {
				current = this.tail;
				this.tail = current.prev;
				this.tail.next = undefined;
			} else {
				current = this.getElementAt(index);
				const previous = current.prev;
				previous.next = current.next;
				current.next.prev = previous;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}
	// 获取元素在链表中的索引
	indexOf(element) {
		let current = this.head;
		let index = 0;
		while (current) {
			if (this.equalsFn(element, current.element)) {
				return index;
			}
			index++;
			current = current.next;
		}
		return -1;
	}
	// 获取链表尾元素
	getTail() {
		return this.tail;
	}
	// 清除链表元素
	clear() {
		super.clear();
		this.tail = undefined;
	}
	// 实现toString方法
	toString() {
		if (!this.head) {
			return '';
		}
		let objStr = `${this.head.element}`;
		let current = this.head.next;
		while (current) {
			objStr = `${objStr},${current.element}`;
			current = current.next;
		}
		return objStr;
	}
	// 翻转链表字符串
	inverseToString() {
		if (!this.tail) {
			return '';
		}
		let objStr = `${this.tail.element}`;
		let previous = this.tail.prev;
		while (previous) {
			objStr = `${objStr}, ${previous.element}`;
			previous = previous.prev;
		}
		return objStr;
	}
}
