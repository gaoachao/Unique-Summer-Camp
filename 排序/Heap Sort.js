function heapSort(arr) {
  let temp;
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    adjustHeap(arr, i, arr.length);
  }
  for (let j = arr.length - 1; j > 0; j--) {
    temp = arr[j];
    arr[j] = arr[0];
    arr[0] = temp;
    adjustHeap(arr, 0, j);
  }
}
//将一个数组(二叉树),调整成一个大顶堆
function adjustHeap(arr, i, length) {
  //先取出当前元素的值
	let temp = arr[i]; 
  //.k=i*2+1是i节点的左子节点
  for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
    //如果左子节点的值小于右子节点的值，让k指向右子节点
		if (k + 1 < length && arr[k] < arr[k + 1]) {
      k++; 
    }
		//如果子节点大于父节点，把较大的值赋给当前节点
    if (arr[k] > temp) {
      arr[i] = arr[k]; 
      i = k;
		//如果满足父节点大于两个子节点，则break
    } else {
      break; 
    }
    //当for循环结束后，将temp值放到调整后的位置
    arr[i] = temp; 
  }
}
