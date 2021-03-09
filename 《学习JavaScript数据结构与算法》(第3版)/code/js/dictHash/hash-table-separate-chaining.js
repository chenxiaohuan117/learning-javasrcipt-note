/**
 * 5.3 处理散列表中的冲突
 * 有时候，一些键会有相同的散列值。
 * 不同的值在散列表中对应相同位置的时候，我们称其为冲突。
 * 处理冲突的方法有：分离链接、线性探查和双散列法。
 * 5.3.1 分离链接
 * 分离链接法包括为散列表的每一位置创建一个链表并将元素存储在里面。
 * 它是解决冲突的最简单的方法，但是在HashTable实例之外还需要额外的存储空间。
 * */

// 创建散列表
class HashTableSeparateChaining {
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 创建（lose lose）散列函数
	loseloseHashCode(key) {
		if (typeof key === 'number') {
			return key;
		}
		const tableKey = this.toStrFn(key);
		let hash = 0;
		for (let i = 0; i < tableKey.length; i++) {
			hash += tableKey.charCodeAt(i);
		}
		return hash % 37;
	}

	hashCode(key) {
		return this.loseloseHashCode(key);
	}
	// 将键和值加入散列表
	put(key, value) {
		if (key != null && value != null) {
			const position = this.hashCode(key);
			if (this.table[position] == null) {
				this.table[position] = new LinkedList();
			}
			this.table[position].push(new ValuePair(key, value));
			return true;
		}
		return false;
	}
	// 从散列表中获取一个值
	get(key) {
		const position = this.hashCode(key);
		const linkedList = this.table[position];
		if (linkedList != null && !linkedList.isEmpty()) {
			let current = linkedList.getHead();
			while (current != null) {
				if (current.element.key === key) {
					return current.element.value;
				}
				current = current.next;
			}
		}
		return undefined;
	}
	// 从散列表中移除一个值
	remove(key) {
		const position = this.hashCode(key);
		const linkedList = this.table[position];
		if (linkedList != null && !linkedList.isEmpty()) {
			let current = linkedList.getHead();
			while (current != null) {
				if (current.element.key === key) {
					linkedList.remove(current.element);
					if (linkedList.isEmpty()) {
						delete this.table[position];
					}
					return true;
				}
				current = current.next;
			}
		}
		return false;
	}
	// 检查散列表是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取散列表的长度
	size() {
		let count = 0;
		Object.values(this.table).forEach(linkedList => {
			count += linkedList.size();
		});
		return count;
	}
	// 清空散列表
	clear() {
		this.table = {};
	}
	// 获取散列表
	getTable() {
		return this.table;
	}
	// 实现toString方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		const keys = Object.keys(this.table);
		let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
		for (let i = 1; i < keys.length; i++) {
			objString = `${objString}, {${keys[i]} => ${this.table[keys[i]].toString()}}`;
		}
		return objString;
	}
}
