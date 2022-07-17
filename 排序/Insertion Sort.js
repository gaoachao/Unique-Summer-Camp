function insertionSort(arr) {
	let len = arr.length;
	let preIndex, current;
	for (let i = 1; i < len; i++) {
			preIndex = i - 1;
			current = arr[i];
			while(preIndex >= 0 && arr[preIndex] > current) {
					arr[preIndex+1] = arr[preIndex];
					preIndex--;
			}
			arr[preIndex+1] = current;
	}
	return arr;
} 
arr=[50,20,40,60,30,100,80,90];
console.log(insertionSort(arr));