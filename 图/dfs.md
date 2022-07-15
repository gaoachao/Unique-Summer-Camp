限制： 

1. 排列的第一个元素为0。
2. n的值不会很大，你可以不用担心内存问题。
3. 本题不接受枚举排列后一一判断的解法！

```text
Example:
Input: n = 3
Output: [0,1,3,2,6,7,5,4]
Explanation: 将数组化为二进制表示为：[000,001,011,010,110,111,101,100]
             任取其中一个数都和两边的数相差一位。
             注意：这并不是唯一答案，你只需要返回一个正确答案即可。
```



```
function solution(n) {
  let row = Math.pow(2, n - 1),
    	column = 2;
  let res = [],
    	arr = [],
    	flag = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      arr[i] = [i * 2, i * 2 + 1];
      flag[i] = [1, 1];
    }
  }
  console.log(flag);
  let dfs = function (i, j) {
    if (i < 0 || i >= row || j < 0 || j >= column || flag[i][j] === 0) return;
    flag[i][j] = 0;
    res.push(arr[i][j]);
    dfs(i, j + 1);
    dfs(i + 1, j);
    dfs(i, j - 1);
    dfs(i - 1, j);
  };
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (flag[i][j] === 1) {
        dfs(i, j);
      }
    }
  }
  return res;
}

console.log(solution(3));  //[0, 1, 3, 5, 7, 6, 4, 2]
```

