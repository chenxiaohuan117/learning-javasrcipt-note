/**
 * 5. 字典
 * 在字典中，存储的是[键, 值]对，其中键名是用来查询特定元素的。
 * 字典和集合很相似，集合以[值, 值]的形式存储元素，字典则是以[键, 值]的形式来存储元素。
 * 字典也称作映射、符号表或关联数组。
 * 在计算机科学中，字典经常用来保存对象的引用地址。
 * */

// 5.1 创建字典类
class Dictionary {
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}
	// 向字典中添加新元素
	set(key, value) {
		if (key != null && value != null) {
			const tableKey = this.toStrFn(key);
			this.table[tableKey] = new ValuePair(key, value);
			return true;
		}
		return false;
	}
	// 从字典中获取键值对应的数据值
	get(key) {
		const valuePair = this.table[this.toStrFn(key)];
		return valuePair == null ? undefined : valuePair.value;
	}
	// 检测字典中是否存在键值对应的数据值
	hasKey(key) {
		return this.table[this.toStrFn(key)] != null;
	}
	// 从字典中移除键值对应的数据值
	remove(key) {
		if (this.hasKey(key)) {
			delete this.table[this.toStrFn(key)];
			return true;
		}
		return false;
	}
	// 将字典所包含的所有数值以数组形式返回
	values() {
		return this.keyValues().map(valuePair => valuePair.value);
	}
	// 将字典所包含的所有键名以数组形式返回
	keys() {
		return this.keyValues().map(valuePair => valuePair.key);
	}
	// 将字典中所有[键, 值]对返回
	keyValues() {
		return Object.values(this.table);
	}
	// 迭代字典
	forEach(callbackFn) {
		const valuePairs = this.keyValues();
		for (let i = 0; i < valuePairs.length; i++) {
			const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
			if (result === false) {
				break;
			}
		}
	}
	// 判断字典是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 返回字典所包含值的数量
	size() {
		return Object.keys(this.table).length;
	}
	// 删除该字典中的所有值
	clear() {
		this.table = {};
	}
	// 实现toSting方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		const valuePairs = this.keyValues();
		let objString = `${valuePairs[0].toString()}`;
		for (let i = 1; i < valuePairs.length; i++) {
			objString = `${objString}, ${valuePairs[i].toString()}`;
		}
		return objString;
	}
}
