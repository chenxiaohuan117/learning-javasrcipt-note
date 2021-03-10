/**
 * 7.1 二叉树和二叉搜索树
 * 二叉树中的节点最多只能有两个子节点，一个是左侧子节点，另一个是右侧子节点。
 * 二叉搜索树（BST），是二叉树的一种，只允许你在左侧子节点存储比父节点小的值，在右侧子节点存储比父节点大的值。
 * 我们通过指针（引用）来表示节点之间的关系（树相关的术语称其为边）。
 * 我们使用两个指针，一个指向左侧子节点，另一个指向右侧子节点。
 * 键是树相关的术语中对节点的称呼。
 * */

// 创建二叉搜索树
class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.root = undefined;
	}
	// 向树中插入一个键
	insert(key) {
		if (this.root == null) {
			this.root = new Node(key);
		} else {
			this.insertNode(this.root, key);
		}
	}

	insertNode(node, key) {
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			if (node.left == null) {
				node.left = new Node(key);
			} else {
				this.insertNode(node.left, key);
			}
		} else if (node.right == null) {
			node.right = new Node(key);
		} else {
			this.insertNode(node.right, key);
		}
	}
	// 在树中查找一个键
	// 通过中序遍历方式遍历所有节点
	// 通过先序遍历方式遍历所有节点
	// 通过后序遍历方式遍历所有节点
	// 返回树中最小的值/键
	// 返回树中最大的值/键
	// 从树中移除某个键
}
