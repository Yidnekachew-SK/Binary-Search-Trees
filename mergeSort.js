function mergeSortRecursive (array) {
	if (array.length <= 1) {
		return array;
	}
	let mid = array.length / 2;

	let leftSide = mergeSortRecursive(array.slice(0,mid));
	let rightSide = mergeSortRecursive(array.slice(mid));

	return merge(leftSide, rightSide);
}


function merge (array1, array2) {
	let mergedArray = [];
	while(array1.length != 0 && array2.length != 0) {
		if(array1[0] === array2[0]) {
			mergedArray.push(array1[0]);
			array1.splice(0,1);
			array2.splice(0,1);
		} else if (array1[0] <= array2[0]) {
			mergedArray.push(array1[0]);
			array1.splice(0,1);
		} else {
			mergedArray.push(array2[0]);
			array2.splice(0,1);
		}
	}

	for(let i = 0; i < array1.length; i++) {
		mergedArray.push(array1[i])
	}

	for(let i = 0; i < array2.length; i++) {
		mergedArray.push(array2[i])
	}

	return mergedArray;	
}


export { mergeSortRecursive };