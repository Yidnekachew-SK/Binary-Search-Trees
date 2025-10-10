import { mergeSortRecursive } from "./mergeSort.js";

const Node = function () {
	let data;
	let left = null;
	let right = null;

	return { data, left, right };
}

const Tree = function (array) {
	let root = buildTree(array);

	function buildTree (array) {
		let sortedArray = mergeSortRecursive(array);
		if (sortedArray.length === 0) {
			return null;
		}

		let mid = Math.floor(sortedArray.length / 2); 

		let rootData = Node();

		rootData.data = sortedArray[mid];
		rootData.left = buildTree(sortedArray.slice(0, mid));
		rootData.right = buildTree(sortedArray.slice(mid + 1));

		return rootData;
	}

	function prettyPrint (node, prefix = '', isLeft = true) {
  		if (node === null) {
   			return;
  		}
  		if (node.right !== null) {
    		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  		}
  		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  		if (node.left !== null) {
    		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  		}
	}

	function insert (value) {
		let newNode = Node();
		newNode.data = value;
		newNode.left = null;
		newNode.right = null;

		let currentNode = root;
		while (true) {
			if (currentNode.data > value) {
				if (currentNode.left === null) {
					currentNode.left = newNode;
					return;
				}
				currentNode = currentNode.left;
			} else {
				if (currentNode.right === null) {
					currentNode.right = newNode;
					return;
				}
				currentNode = currentNode.right;
			}
		}
	}

	function deleteItem (node, value) {
		if (node === null) { return null};

		if (node.data > value) {
			node.left = deleteItem(node.left, value);
		} else if (node.data < value) {
			node.right = deleteItem(node.right, value);
		} else {
			if (node.left === null && node.right === null) {
				return null;
			} else if (node.left === null) {
				return node.right;
			} else if (node.right === null) {
				return node.left;
			} else {
				let replacerNode = findMinimumNode(node.right);
				node.data = replacerNode.data;
				node.right = deleteItem(node.right, replacerNode);
			}
		}

		return node;
	}

	function findMinimumNode (root) {
		while (root.left != null) {
			root = root.left;
		}

		return root;
	}

	function find (value) {
		let currentNode = root;

		while (currentNode != null) {
			if (currentNode.data === value) {
				return currentNode;
			} else if (currentNode.data > value) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}
		}

		return null;
	}

	function levelOrderForEach (callback) {
		if (callback === null) { throw new Error("Callback is required!") }
		if (root === null) { return }

		let queue = [root];
		while (queue.length > 0) {
			let node = queue.shift();
			callback(node);

			if (node.left != null) { queue.push(node.left) }
			if (node.right != null) { queue.push(node.right) }
		}
	}

	function inOrderForEach (callback) {
		if (callback === null) { throw new Error("Callback is required!") }
		if (root === null) { return }

		let currentNode = root;

		function inorderTraverse(node) {
        	if (node === null) return;
        	inorderTraverse(node.left);
        	callback(node);
        	inorderTraverse(node.right);
    	}

    	inorderTraverse(currentNode);
	}

	return { root, prettyPrint, insert, deleteItem, find, levelOrderForEach, inOrderForEach }
}
