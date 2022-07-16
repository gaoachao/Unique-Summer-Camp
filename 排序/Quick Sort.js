function quickSort(arr, left, right) {
	let len = arr.length,
			pivot;

	//这两行代码的意思是如果left和right传参数，就用参数（递归中）；如果没有传参即第一次就是默认的0和len-1
	left = typeof left != 'number' ? 0 : left;
	right = typeof right != 'number' ? len - 1 : right;
	
	if (left < right) {
			pivot = partition(arr, left, right);
			quickSort(arr, left, pivot-1);
			quickSort(arr, pivot+1, right);
	}
	return arr;
}

//先选取当中的一个关键字，然后想办法把它放在一个位置，使得它左边的值都比它小，右边的值都比它大
function partition(arr, left ,right) {     
	let pivot = left,                      
			index = pivot + 1;
	for (let i = index; i <= right; i++) {
			if (arr[i] < arr[pivot]) {
					swap(arr, i, index);
					index++;
			}
	}
	swap(arr, pivot, index - 1);
	//index-1是现在pivot真正的位置
	return index-1;
}

//通过交换索引交换数组元素
function swap(arr, i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

arr=[50,20,40,60,30,100,80,90];
console.log(quickSort(arr));