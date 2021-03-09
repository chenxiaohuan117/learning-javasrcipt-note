/**
 * 5.2 散列表
 * 散列算法的作用是尽可能快地在数据结构中找到一个值。
 * 使用散列函数，就知道值的具体位置，因此能够快速检索到该值。
 * 散列函数的作用是给定一个键值，然后返回值在表中的地址。
 * 散列表有一些在计算机科学中应用的例子。
 * 因为它是字典的一种实现，所以可以用作关联数组。
 * 它也可以用来对数据库进行索引。
 * 另一个很常见的应用是使用散列表来表示对象。
 * JavaScript语言内部就是使用散列表来表示每个对象。
 * 此时对象的每个属性和方法（成员）被存储为key对象类型，每个key指向对应的对象成员。
 * */

// 创建散列表
class HashTable {
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

	// djb2HashCode(key) {
	// 	const tableKey = this.toStrFn(key);
	// 	let hash = 5381;
	// 	for (let i = 0; i < tableKey.length; i++) {
	// 		hash = (hash * 33) + tableKey.charCodeAt(i);
	// 	}
	// 	return hash % 1013;
	// }

	hashCode(key) {
		return this.loseloseHashCode(key);
	}
	// 将键和值加入散列表
	put(key, value) {
		if (key != null && value != null) {
			const position = this.hashCode(key);
			this.table[position] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 从散列表中获取一个值
	get(key) {
		const valuePair = this.table[this.hashCode(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
	// 从散列表中移除一个值
	remove(key) {
		const hash = this.hashCode(key);
		const valuePair = this.table[hash];
		if (valuePair != null) {
			delete this.table[hash];
			return true;
		}
		return false;
	}
	// 获取散列表
	getTable() {
		return this.table;
	}
	// 检查散列表是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 获取散列表的长度
	size() {
		return Object.keys(this.table).length;
	}
	// 清空散列表
	clear() {
		this.table = {};
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
