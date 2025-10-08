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
		//console.log(sortedArray[mid]);

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

	return { root, buildTree, prettyPrint }
}

const arr = [2, 3, 1, 6, 8, 4, 3, 5]
const a = Tree(arr);
a.buildTree(arr);
console.log(a.root);
a.prettyPrint(a.root, "", false);
