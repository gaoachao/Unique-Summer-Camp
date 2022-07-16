# 剑指 Offer 51. 数组中的逆序对

## 题干

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

示例 1:

```
输入: [7,5,6,4]
输出: 5
```

## 题解

### 思路

1. 使用递归的思想，把`nums`分成不能再分的数组，长度为1或者2。
2. 对每个小数组进行归并排序，以偶数个为例子，每个小数组的长度为2，自身排序，如果出现逆序则++。
3. 合并数组，2和2合并，如果第一个数组的第一个元素和第二个数组的第一个元素存在逆序，则说明其实存在两对逆序，因为第一个数组已经是从小到大的顺序排列了。
4. 因此`sum += leftLen - i`，这也是如何将归并排序运用到本题上的最重要一步。

### 代码

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    // 归并排序
    let sum = 0;
    mergeSort(nums);
    return sum;

    function mergeSort (nums) {
        if(nums.length < 2) return nums;
        const mid = parseInt(nums.length / 2);
        let left = nums.slice(0,mid);
        let right = nums.slice(mid);
        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
        let res = [];
        let leftLen = left.length;
        let rightLen = right.length;
        let len = leftLen + rightLen;
        for(let index = 0, i = 0, j = 0; index < len; index ++) {
            if(i >= leftLen) res[index] = right[j ++];
            else if (j >= rightLen) res[index] = left[i ++];
            else if (left[i] <= right[j]) res[index] = left[i ++];
            else {
                res[index] = right[j ++];
                sum += leftLen - i; //在这里进行逆序对的计数
            }
        }
        return res;
    }
};
```

