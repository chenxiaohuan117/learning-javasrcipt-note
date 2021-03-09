/**
 * 5.3.2 线性探查
 * 它处理冲突的方法是将元素直接存储到表中，而不用在单独的数据结构中。
 * 当想向表中某个位置添加一个新元素的时候，如果索引为position的位置已经被占据了，就尝试position+1的位置。
 * 如果position+1的位置也被占据了，就尝试position+2的位置。以此类推，直到在散列表中找到一个空闲的位置。
 * 线性探查技术分为两种：
 * 第一种是软删除方法：
 * 我们使用一个特殊的值（标记）来表示键值对被删除了（惰性删除或软删除）。
 * 经过一段时间，散列表被操作过后，我们会得到一个标记了若干删除位置的散列表。
 * 这会逐渐降低散列表的效率，因为搜索键值会随时间变得更慢。
 * 第二种方法需要检验是否有必要将一个或多个元素移动到之前的位置。
 * 这种方法可以避免找到一个空位置。
 * 如果移动元素是必要的，我们就需要在散列表中挪动键值对。
 * */

class HashTableLinearProbingLazy {
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
			if (
				this.table[position] == null ||
				(this.table[position] != null && this.table[position].isDeleted)
			) {
				this.table[position] = new ValuePairLazy(key, value);
			} else {
				let index = position + 1;
				while (this.table[index] != null && !this.table[position].isDeleted) {
					index++;
				}
				this.table[index] = new ValuePairLazy(key, value);
			}
			return true;
		}
		return false;
	}
	// 从散列表中获取一个值
	get(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key && !this.table[position].isDeleted) {
				return this.table[position].value;
			}
			let index = position + 1;
			while (
				this.table[index] != null &&
				(this.table[index].key !== key || this.table[index].isDeleted)
			) {
				if (this.table[index].key === key && this.table[index].isDeleted) {
					return undefined;
				}
				index++;
			}
			if (
				this.table[index] != null &&
				this.table[index].key === key &&
				!this.table[index].isDeleted
			) {
				return this.table[position].value;
			}
		}
		return undefined;
	}
	// 从散列表中移除一个值
	remove(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key && !this.table[position].isDeleted) {
				this.table[position].isDeleted = true;
				return true;
			}
			let index = position + 1;
			while (
				this.table[index] != null &&
				(this.table[index].key !== key || this.table[index].isDeleted)
			) {
				index++;
			}
			if (
				this.table[index] != null &&
				this.table[index].key === key &&
				!this.table[index].isDeleted
			) {
				this.table[index].isDeleted = true;
				return true;
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
		Object.values(this.table).forEach(valuePair => {
			count += valuePair.isDeleted === true ? 0 : 1;
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
			objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
		}
		return objString;
	}
}

class HashTableLinearProbing {
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
				this.table[position] = new ValuePair(key, value);
			} else {
				let index = position + 1;
				while (this.table[index] != null) {
					index++;
				}
				this.table[index] = new ValuePair(key, value);
			}
			return true;
		}
		return false;
	}
	// 从散列表中获取一个值
	get(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key) {
				return this.table[position].value;
			}
			let index = position + 1;
			while (this.table[index] != null && this.table[index].key !== key) {
				index++;
			}
			if (this.table[index] != null && this.table[index].key === key) {
				return this.table[position].value;
			}
		}
		return undefined;
	}
	// 从散列表中移除一个值
	remove(key) {
		const position = this.hashCode(key);
		if (this.table[position] != null) {
			if (this.table[position].key === key) {
				delete this.table[position];
				this.verifyRemoveSideEffect(key, position);
				return true;
			}
			let index = position + 1;
			while (this.table[index] != null && this.table[index].key !== key) {
				index++;
			}
			if (this.table[index] != null && this.table[index].key === key) {
				delete this.table[index];
				this.verifyRemoveSideEffect(key, index);
				return true;
			}
		}
		return false;
	}

	verifyRemoveSideEffect(key, removedPosition) {
		const hash = this.hashCode(key);
		let index = removedPosition + 1;
		while (this.table[index] != null) {
			const posHash = this.hashCode(this.table[index].key);
			if (posHash <= hash || posHash <= removedPosition) {
				this.table[removedPosition] = this.table[index];
				delete this.table[index];
				removedPosition = index;
			}
			index++;
		}
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
