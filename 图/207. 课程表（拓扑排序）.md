# 207.课程表

## 题干

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1` 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]` ，表示如果要学习课程 `ai` 则 必须 先学习课程  `bi` 。

例如，先修课程对 `[0, 1]` 表示：想要学习课程 `0` ，你需要先完成课程 `1` 。
请你判断是否可能完成所有课程的学习？如果可以，返回 `true` ；否则，返回 `false` 。

示例 1：

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
```

示例 2：

```
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
```

## 题解

### 题干解读

1. 实例二中没有一门课程初始入度为0，则根本就修不了课程。因此我们可以得出一个结论，在判断能否修完所有课程的时候，一定得有初始入度为0的先修课进队列。

### 思路

1. 把一个 有向无环图转成线性的排序叫**拓扑排序**。
2. 有向图有入度和出度的概念：
   - 如果存在一条有向边 A --> B，则这条边给 A 增加了 1 个出度，给 B 增加了 1 个入度。

3. 让入度为 0 的课入列，它们是能直接选的课。然后逐个出列，出列代表着课被选，需要减小相关课的入度。如果相关课的入度新变为 0，安排它入列、再出列……直到没有入度为 0 的课可入列。（有点像BFS）

### 代码

```javascript
var canFinish = (numCourses, prerequisites) => {
  let inDegree = new Array(numCourses).fill(0); 
  // 入度数组，先让所有课程的入度均为0
  let map = {};                                 
  // 邻接表
  // key为先修课，value为后续课程
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;              
    // 求所有课程课的初始入度值
    if (map[prerequisites[i][1]]) {               
      // 当前课已经存在于邻接表，即已经有了一门先修课程
      map[prerequisites[i][1]].push(prerequisites[i][0]); 
      // 再添加依赖它的后续课
    } else {                                      
      // 当前课不存在于邻接表
      map[prerequisites[i][1]] = [prerequisites[i][0]];
      //让prerequisites[i][1]指向prerequisites[i][0]，相当于增加边
    }
  }
  let queue = [];
  for (let i = 0; i < inDegree.length; i++) { 
    // 所有入度为0的课入列，入度为0代表一定可以选
    if (inDegree[i] == 0)  queue.push(i);
  }
  let count = 0;
  while (queue.length) {
    let selected = queue.shift();           
    // 当前选的课，出列
    count++;                                  
    // 选课数+1
    const toEnQueue = map[selected];          
    // 获取这门课对应的后续课
    if (toEnQueue && toEnQueue.length) {      
    // 确实有后续课
      for (let i = 0; i < toEnQueue.length; i++) {
        inDegree[toEnQueue[i]]--;             
        // 依赖它的后续课的入度-1
        if (inDegree[toEnQueue[i]] == 0) {    
        // 如果因此减为0，入列
          queue.push(toEnQueue[i]);
        }
      }
    }
  }
  return count == numCourses; 
  // 选了的课等于总课数，true，否则false
};
```

