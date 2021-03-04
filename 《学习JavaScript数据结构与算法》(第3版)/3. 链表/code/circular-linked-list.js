/**
 * 循环链表
 * 可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
 * 循环链表最后一个元素指向下一个元素的指针（tail.next）指向第一个元素（head）。
 * 双向循环链表有指向head元素的tail.next和指向tail元素的head.prev。
 * */

// 创建循环链表
class CircularLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals) {
		super(equalsFn);
	}
	// 向链表尾部添加一个新元素
	push(element) {
		const node = new Node(element);
		let current;
		if (!this.head) {
			this.head = node;
		} else {
			current = this.getElementAt(this.size() - 1);
			current.next = node;
		}
		node.next = this.head;
		this.count++;
	}
	// 向链表中的特定位置插入一个新元素
	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new Node(element);
			let current = this.head;
			if (index === 0) {
				if (!this.head) {
					this.head = node;
					node.next = this.head;
				} else {
					node.next = current;
					current = this.getElementAt(this.size());
					this.head = node;
					current.next = this.head;
				}
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
	// 从特定位置移除一个元素
	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				if (this.size() === 1) {
					this.head = undefined;
				} else {
					const removed = this.head;
					current = this.getElementAt(this.size() - 1);
					this.head = this.head.next;
					current.next = this.head;
					current = removed;
				}
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
}
