import { Tree } from "./binarySearchTree.js";

function arrayOfRandomNumbers (amount, max) {
	let arr = [];
	for (let i = 0; i < amount; i++) {
		let number = Math.floor(Math.random() * max);
		arr.push(number);
	}

	return arr;
}


let array = arrayOfRandomNumbers(5, 100);
const tree = Tree(array);
console.log(tree.isBalanced());

console.log("level order")
tree.levelOrderForEach(node => {
	console.log(node.data)
});

console.log("pre order")
tree.preOrderForEach(node => {
	console.log(node.data)
});

console.log("post order")
tree.postOrderForEach(node => {
	console.log(node.data)
});

console.log("in order")
tree.inOrderForEach(node => {
	console.log(node.data)
});

tree.insert(234);
tree.insert(175);
tree.insert(940);
tree.insert(411);
tree.insert(183);
console.log(tree.isBalanced());
tree.reBalance();
console.log(tree.isBalanced());
tree.prettyPrint(tree.getRoot(), "", true);