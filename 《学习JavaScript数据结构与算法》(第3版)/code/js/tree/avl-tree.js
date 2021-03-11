/**
 * 7.5 自平衡树
 * 
 * BST存在一个问题：
 * 取决于添加的节点树，树的一条边可能会非常深。
 * 也就是说，树的一条分支会有很多层，而其他的分支却只有几层。
 * 这会在需要在某条边上添加、移除和搜索某个节点时引起一些性能问题。
 * 为了解决这个问题，可以使用自平衡二叉搜索树（Adelson-Velskii-Landi，AVL树）。
 * 添加或移除节点时，AVL树会尝试保持自平衡，
 * 任意一个节点的左子树和右子树高度最多相差1。
 * 在AVL树中插入或移除节点和BST完全相同，只是AVL需要检验树的平衡因子，如果需要，会将其逻辑应用于树的自平衡。
 * 在AVL树中，需要对每个节点计算右子树高度（hr）和左子树高度（hl）之间的差值，该值（hr - hl）应为0、1或-1。
 * 如果结果不是这三个值之一，就需要平衡该AVL树，这就是平衡因子的概念。
 * */

const BalanceFactor = {
	UNBALANCED_RIGHT: 1,
	SLIGHTLY_UNBALANCED_RIGHT: 2,
	BALANCED: 3,
	SLIGHTLY_UNBALANCED_LEFT: 4,
	UNBALANCED_LEFT: 5
};

// 创建自平衡树
class AVLTree extends BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		super(compareFn);
		this.compareFn = compareFn;
		this.root = null;
	}
	// 计算一个节点高度
	getNodeHeight(node) {
		if (node == null) {
			return -1;
		}
		return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
	}
	// 向AVL树插入节点时，可以执行单旋转或双旋转两种平衡操作，​分别对应四种场景。
	// a. 左-左(LL):向右的单旋转
	rotationLL(node) {
		const tmp = node.left;
		node.left = tmp.right;
		tmp.right = node;
		return tmp;
	}
	// b. 右-右(RR):向左的单旋转
	rotationRR(node) {
		const tmp = node.right;
		node.right = tmp.left;
		tmp.left = node;
		return tmp;
	}
	// c. 左-右(LR):向右的双旋转
	rotationLR(node) {
		node.left = this.rotationRR(node.left);
		return this.rotationLL(node);
	}
	// d. 右-左(RL):向左的双旋转
	rotationRL(node) {
		node.right = this.rotationLL(node.right);
		return this.rotationRR(node);
	}
	// 计算一个节点的平衡因子
	getBalanceFactor(node) {
		const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
		switch (heightDifference) {
			case -2:
				return BalanceFactor.UNBALANCED_RIGHT;
			case -1:
				return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
			case 1:
				return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
			case 2:
				return BalanceFactor.UNBALANCED_LEFT;
			default:
				return BalanceFactor.BALANCED;
		}
	}
	// 向AVL树插入节点
	insert(key) {
		this.root = this.insertNode(this.root, key);
	}
	insertNode(node, key) {
		if (node == null) {
			return new Node(key);
		}
		if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
			node.left = this.insertNode(node.left, key);
		} else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
			node.right = this.insertNode(node.right, key);
		} else {
			return node;
		}
		const balanceFactor = this.getBalanceFactor(node);
		if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
			if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
				node = this.rotationLL(node);
			} else {
				return this.rotationLR(node);
			}
		}
		if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
			if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
				node = this.rotationRR(node);
			} else {
				return this.rotationRL(node);
			}
		}
		return node;
	}
	// 从AVL树中移除节点
	removeNode(node, key) {
		node = super.removeNode(node, key);
		if (node == null) {
			return node;
		}
		const balanceFactor = this.getBalanceFactor(node);
		if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
			if (
				this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
				this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
			) {
				return this.rotationLL(node);
			}
			if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
				return this.rotationLR(node.left);
			}
		}
		if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
			if (
				this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
				this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
			) {
				return this.rotationRR(node);
			}
			if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
				return this.rotationRL(node.right);
			}
		}
		return node;
	}
}
