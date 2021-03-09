// 2.3 用队列和双端队列解决问题

// 2.3.1 循环队列--击鼓传花游戏
function hotPotato(elementsList, num) {
	const queue = new Queue();
	const elimitatedList = [];
	for (let i = 0; i < elementsList.length; i++) {
		queue.enqueue(elementsList[i]);
	}
	while (queue.size() > 1) {
		for (let i = 0; i < num; i++) {
			queue.enqueue(queue.dequeue());
		}
		elimitatedList.push(queue.dequeue());
	}
	return {
		elimitatedList: elimitatedList,
		winner: queue.dequeue()
	}
}

// 2.3.2 回文检查器
function palindromeChecker(str) {
	if (!str) {
		return false;
	}
	const deque = new Deque();
	const lowerStr = str.toLocaleLowerCase().split(' ').join('');
	let isEqual = true;
	let firstChar, lastChar;
	for (let i = 0; i < lowerStr.length; i++) {
		deque.addBack(lowerStr.charAt(i));
	}
	while (deque.size() > 1 && isEqual) {
		firstChar = deque.removeFront();
		lastChar = deque.removeBack();
		if (firstChar !== lastChar) {
			isEqual = false;
		}
	}
	return isEqual;
}
