/**
 * 有序链表，是指保持元素有序的链表结构。
 * 除了使用排序算法外，我们还可以将元素插入到正确的位置来保证链表的有序性。
 * */

// 创建有序链表
class SortedLinkedList extends LinkedList {
	constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
		super(equalsFn);
		this.compareFn = compareFn;
	}
	// 向链表尾部添加一个新元素
	push(element) {
		if (this.isEmpty()) {
			super.push(element);
		} else {
			const index = this.getIndexNextSortedElement(element);
			super.insert(element, index);
		}
	}
	// 向链表中的特定位置插入一个新元素
	insert(element, index = 0) {
		if (this.isEmpty()) {
			return super.insert(element, index === 0 ? index : 0);
		}
		const pos = this.getIndexNextSortedElement(element);
		return super.insert(element, pos);
	}
	// 获取元素的插入位置
	getIndexNextSortedElement(element) {
		let current = this.head;
		let i = 0;
		for (; i < this.size() && current; i++) {
			const comp = this.compareFn(element, current.element);
			if (comp === Compare.LESS_THAN) {
				return i;
			}
			current = current.next;
		}
		return i;
	}
}
