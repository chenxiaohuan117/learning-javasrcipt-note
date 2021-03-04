/**
 * 可以使用LinkedList类及其扩展作为内部的数据结构来创建其他数据类型，例如栈、队列和双向队列。
 * */

// 创建基于链表的栈
class StackLinkedList {
	constructor() {
		this.items = new DoublyLinkedList();
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
		const result = this.items.removeAt(this.size() - 1);
		return result;
	}
	// 查看栈顶元素
	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items.getElementAt(this.size() - 1).element;
	}
	// 检查栈是否为空
	isEmpty() {
		return this.items.isEmpty();
	}
	// 获取栈的长度
	size() {
		return this.items.size();
	}
	// 清空栈元素
	clear() {
		this.items.clear();
	}
	// 实现toString方法
	toString() {
		return this.items.toString();
	}
}
