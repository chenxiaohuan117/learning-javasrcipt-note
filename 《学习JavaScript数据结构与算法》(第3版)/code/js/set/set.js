/**
 * 4. 集合
 * 集合是一种不允许值重复的顺序数据结构，是由一组无序且唯一的项组成的。
 * 集合运算（并集、交集、差集、子集等）在计算机科学中的主要应用之一是数据库。
 * 当我们创建一条从关系型数据库中获取一个数据集合的查询语句时，
 * 使用的就是集合运算，数据库也会返回一个数据集合。
 * 当我们创建一条SQL查询命令时，可以指定是从表中获取全部数据还是获取其中的子集；
 * 也可以获取两张表共有的数据；
 * 或是只存在于一张表中而不存在于另一张表中的数据；
 * 或是存在于两张表内的数据。
 * 这些SQL领域的运算叫作联接，而SQL联接的基础就是集合运算。
 * 没有副作用的方法和函数被称为纯函数。
 * 纯函数不会修改当前的实例或参数，只会生成一个新的结果。
 * */

// 4.1 创建集合类
class Set {
	constructor() {
		this.items = {};
	}
	// 检查元素是否在集合中
	has(element) {
		return Object.prototype.hasOwnProperty.call(this.items, element);
	}
	// 向集合中添加一个新元素
	add(element) {
		if (!this.has(element)) {
			this.items[element] = element;
			return true;
		}
		return false;
	}
	// 从集合中移除一个元素
	delete(element) {
		if (this.has(element)) {
			delete this.items[element];
			return true;
		}
		return false;
	}
	// 移除集合中的所有元素
	clear() {
		this.items = {};
	}
	// 获取集合中所包含元素的数量
	size() {
		return Object.keys(this.items).length;
	}
	// 获取包含集合中所有元素值
	values() {
		return Object.values(this.items);
	}
	// 判断集合是否为空
	isEmpty() {
		return this.size() === 0;
	}
	// 实现toString方法
	toString() {
		if (this.isEmpty()) {
			return '';
		}
		const values = this.values();
		let objStr = `${values[0]}`;
		for (let i = 1; i < values.length; i++) {
			objStr = `${objStr}, ${values[i].toString()}`;
		}
		return objStr;
	}
	// 并集
	union(otherSet) {
		const unionSet = new Set();
		this.values().forEach(value => unionSet.add(value));
		otherSet.values().forEach(value => unionSet.add(value));
		return unionSet;
	}
	// 交集
	intersection(otherSet) {
		const intersectionSet = new Set();
		const values = this.values();
		const otherValues = otherSet.values();
		let biggerSet = values;
		let smallerSet = otherValues;
		if (otherValues.length - values.length > 0) {
			biggerSet = otherValues;
			smallerSet = values;
		}
		smallerSet.forEach(value => {
			if (biggerSet.includes(value)) {
				intersectionSet.add(value);
			}
		});
		return intersectionSet;
	}
	// 差集
	difference(otherSet) {
		const differenceSet = new Set();
		this.values().forEach(value => {
			if (!otherSet.has(value)) {
				differenceSet.add(value);
			}
		});
		return differenceSet;
	}
	// 子集
	isSubsetOf(otherSet) {
		if (this.size() > otherSet.size()) {
			return false;
		}
		let isSubset = true;
		this.values().every(value => {
			if (!otherSet.has(value)) {
				isSubset = false;
				return false;
			}
			return true;
		});
		return isSubset;
	}
}
