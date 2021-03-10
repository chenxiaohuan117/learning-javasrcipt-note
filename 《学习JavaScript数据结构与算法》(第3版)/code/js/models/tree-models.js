class Node {
	constructor(key) {
		this.key = key;//节点值
		this.left = undefined;//左侧子节点引用
		this.right = undefined;//右侧子节点引用
	}

	toString() {
		return `${this.key}`;
	}
}
