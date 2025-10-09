import { mergeSortRecursive } from "./mergeSort.js";

const Node = function () {
	let data;
	let left = null;
	let right = null;

	return { data, left, right };
}

const Tree = function (array) {

	const buildTree = function (array) {
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

	let root = buildTree(array);

	const prettyPrint = (node, prefix = '', isLeft = true) => {
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

	const compareValue = function (currentNode, value) {
		if (currentNode.data > value) {
			return currentNode.left;
		} else {
			return currentNode.right;
		}
	}

	const insert = function (value) {
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

	const find = function (value) {
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

	return { root, buildTree, prettyPrint, insert, find }
}
