/**
 * 7.1 二叉树和二叉搜索树
 * 二叉树中的节点最多只能有两个子节点，一个是左侧子节点，另一个是右侧子节点。
 * 二叉搜索树（BST），是二叉树的一种，只允许在左侧子节点存储比父节点小的值，在右侧子节点存储比父节点大的值。
 * 我们通过两个指针（引用）来表示节点之间的关系，
 * 一个指向左侧子节点，另一个指向右侧子节点。
 * 
 * 7.2 树的遍历 
 * 遍历一颗树是指访问树的每个节点并对它们进行某种操作的过程。
 * 
 * 7.2.1 中序遍历
 * 是一种以上行顺序访问BST所有节点的遍历方式，也就是从最小到最大的顺序访问所有节点。
 * 中序遍历的一种应用就是对树进行排序操作。
 * 
 * 7.2.2 先序遍历
 * 是以优先于后代节点的顺序访问每个节点的。
 * 先序遍历的一种应用是打印一个结构化的文档。
 * 
 * 7.2.3 后序遍历
 * 是先访问节点的后代节点，再访问节点本身。
 * 后序遍历的一种应用是计算一个目录及子目录中所有文件所占空间的大小。
 * 
 * 7.3 搜索树中的值
 * 7.3.1 搜索最小值
 * 7.3.2 搜索最大值
 * 7.3.3 搜索特定值
 * 
 * 7.4 移除一个节点
 * 7.4.1 移除一个叶节点
 * 7.4.2 移除有一个左侧或右侧节点的节点
 * 7.4.3 移除有两个子节点的节点
 * */

// 7.1.1 创建二叉搜索树
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
	// 通过中序遍历方式遍历所有节点
	inOrderTraverse(callback) {
		this.inOrderTraverseNode(this.root, callback);
	}
	inOrderTraverseNode(node, callback) {
		if (node != null) {
			this.inOrderTraverseNode(node.left, callback);
			callback(node.key);
			this.inOrderTraverseNode(node.right, callback);
		}
	}
	// 通过先序遍历方式遍历所有节点
	preOrderTraverse(callback) {
		this.preOrderTraverseNode(this.root, callback);
	}
	preOrderTraverseNode(node, callback) {
		if (node != null) {
			callback(node.key);
			this.preOrderTraverseNode(node.left, callback);
			this.preOrderTraverseNode(node.right, callback);
		}
	}
	// 通过后序遍历方式遍历所有节点
	postOrderTraverse(callback) {
		this.postOrderTraverseNode(this.root, callback);
	}
	postOrderTraverseNode(node, callback) {
		if (node != null) {
			this.postOrderTraverseNode(node.left, callback);
			this.postOrderTraverseNode(node.right, callback);
			callback(node.key);
		}
	}
	// 搜索树中最小的值/键
	min() {
		return this.minNode(this.root);
	}
	minNode(node) {
		let current = node;
		while (current != null && current.left != null) {
			current = current.left;
		}
		return current;
	}
	// 搜索树中最大的值/键
	max() {
		return this.maxNode(this.root);
	}
	maxNode(node) {
		let current = node;
		while (current != null && current.right != null) {
			current = current.right;
		}
		return current;
	}
	// 搜索树中特定的值/键
	search(key) {
		return this.searchNode(this.root, key);
	}
	searchNode(node, key) {
		if (node == null) {
			return false;
		}
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			return this.searchNode(node.left, key);
		}
		if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			return this.searchNode(node.right, key);
		}
		return true;
	}
	// 从树中移除某个键
	remove(key) {
		this.root = this.removeNode(this.root, key);
	}
	removeNode(node, key) {
		if (node == null) {
			return undefined;
		}
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			node.left = this.removeNode(node.left, key);
			return node;
		}
		if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			node.right = this.removeNode(node.right, key);
			return node;
		}
		// 移除一个叶节点
		if (node.left == null && node.right == null) {
			node = undefined;
			return node;
		}
		// 移除有一个左侧或右侧节点的节点
		if (node.left == null) {
			node = node.right;
			return node;
		}
		if (node.right == null) {
			node = node.left;
			return node;
		}
		// 移除有两个子节点的节点
		const aux = this.minNode(node.right);
		node.key = aux.key;
		node.right = this.removeNode(node.right, aux.key);
		return node;
	}
}
