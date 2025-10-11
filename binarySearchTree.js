import { mergeSortRecursive } from "./mergeSort.js";

const Node = function () {
	let data;
	let left = null;
	let right = null;

	return { data, left, right };
}

const Tree = function (array) {
	let root = buildTree(array);

	function setRoot (rootNode) {
		root = rootNode;
	}

	function getRoot () {
		return root;
	}

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
		if (node === null) return null;

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
		if (root === null) return;

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
		if (root === null) return;

		function inOrderTraverse(node) {
        	if (node === null) return;
        	inOrderTraverse(node.left);
        	callback(node);
        	inOrderTraverse(node.right);
    	}

    	inOrderTraverse(root);
	}

	function preOrderForEach (callback) {
		if (callback === null) { throw new Error("Callback is required!") }
		if (root === null) return;

		function preOrderTraverse(node) {
        	if (node === null) return;
        	callback(node);
        	preOrderTraverse(node.left);
        	preOrderTraverse(node.right);
    	}

    	preOrderTraverse(root);
	}

	function postOrderForEach (callback) {
		if (callback === null) { throw new Error("Callback is required!") }
		if (root === null) return;

		function postOrderTraverse(node) {
        	if (node === null) return;
        	postOrderTraverse(node.left);
        	postOrderTraverse(node.right);
        	callback(node);
    	}

    	postOrderTraverse(root);
	}

	function height (value) {
		if (find(value) === null) return null;
		let currentNode = find(value);

		function heightOfNode (node) {
			if (node === null) return -1;
			let leftHeight = heightOfNode(node.left);
			let rightHeight = heightOfNode(node.right);

			return (1 + Math.max(leftHeight, rightHeight));
		}

		return heightOfNode(currentNode);
	}

	function depth (value) {
		let currentNode = root;
		let count = 0;

		while (currentNode != null) {
			if (currentNode.data === value) {
				return count;
			} else if (currentNode.data > value) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}

			count++;
		}

		return null;
	}

	function isBalanced () {
		function checkBalance (node) {
			if (node === null) { return 0 }

			let leftSide = checkBalance(node.left);
			if (leftSide === -1) return -1;

			let rightSide = checkBalance(node.right);
			if (rightSide === -1) return -1;

			if (Math.abs(leftSide - rightSide) > 1) return -1;

			return 1 + Math.max(leftSide, rightSide);
		}

		return checkBalance(root) != -1;
	}

	function reBalance () {
		let nodeData = [];
		preOrderForEach((node) => {
			nodeData.push(node.data);
		})
		setRoot(buildTree(nodeData));
	}

	return { setRoot, getRoot, prettyPrint, insert, deleteItem, find, levelOrderForEach, inOrderForEach,
			preOrderForEach, postOrderForEach, height, depth, isBalanced, reBalance }
}

export { Tree };