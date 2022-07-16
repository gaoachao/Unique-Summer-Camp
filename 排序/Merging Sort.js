function mergeSort(arr) {
  let len = arr.length;
  
	let merge = function (left, right) {
    let result = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
  };

  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2),
    	left = arr.slice(0, middle),
    	right = arr.slice(middle);
	//将数组切成左右两个
  return merge(mergeSort(left), mergeSort(right));
}
