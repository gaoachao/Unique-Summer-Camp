import { Dictionary } from "./Dictionary.js";

class Graph {
  constructor(isDirected = true) {
    this.isDirected = isDirected;
    // 判断是否为有向图,默认为true
    this.vertices = [];
    // 存放所有节点的名字
    this.adjList = new Dictionary();
    // 用字典储存邻接表, 使用节点名字作为key，邻接节点列表作为value
  }

  //向图中添加节点
  addVertex(node) {
    if (!this.vertices.includes(node)) {
      this.vertices.push(node);
      this.adjList.set(node, []);
      // 加入节点，邻接列表为空
    }
  }

  //给v,w添加有向边的方法
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    // 将v的邻接节点列表中加入w
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
      // 如果为无向图还需要在w的邻接表中加入v，无向图相当于是两条有向边
    }
  }
  //返回节点列表
  getVertices() {
    return this.vertices;
  }
  //返回邻接表
  getAdjList() {
    return this.adjList;
  }

  //打印邻接表
  toString() {
    let res = "";
    for (let i in this.vertices) {
      res += `${this.vertices[i]}->`;
      let neighbors = this.adjList.get(this.vertices[i]);
      for (let j in neighbors) {
        res += `${neighbors[j]} `;
      }
      res += "\n";
    }
    return res;
  }
}

//Colors属性用于标记节点的访问状态
const Colors = {
  WHITE: 0, //表示该节点还没被访问
  GREY: 1,  //表示该节点被访问过，但并未被探索过。
  BLACK: 2, //表示该节点被探索过
};
const initializeColor = (vertices) => {
  const color = {};
  for (let i in vertices) {
    color[vertices[i]] = Colors.WHITE; 
		//将每个节点初始化为白色表示所有节点没有被访问过
  }
  return color;
};


//深度优先搜索
function dfs(graph, callback) {
  const vertices = graph.getVertices(); 
	//获取所有节点
  const adjList = graph.getAdjList(); 
	//获取邻接表
  const color = initializeColor(vertices); 
	//初始化所有节点为未访问状态

	let dfsVisit = function (v, color, adjList, callback) {
		color[v] = Colors.GREY; 
		//将节点状态设置为已访问
		const neighbors = adjList.get(v); 
		//获取所有邻接节点
		if (callback) {
			callback(v); 
			//执行需要对访问元素执行的操作
		}
		for (let i in neighbors) {
			let w = neighbors[i];
			if (color[w] === Colors.WHITE) {
				//如果有未访问的邻接节点
				dfsVisit(w, color, adjList, callback); 
				//继续向下访问
			}
		}
		color[v] = Colors.BLACK; 
		//下面的所有邻接节点都访问过了之后将元素状态设置未已探索
	}


  for (let i in vertices) {
    if (color[vertices[i]] === Colors.WHITE) {
      //如果第一个节点没有访问过
      dfsVisit(vertices[i], color, adjList, callback); 
			//开始访问
    }
  }
}

//广度优先搜索
const bfs = (graph, startVertex, callback) => {
  const vertices = graph.getVertices(); 
  const adjList = graph.getAdjList(); 
  const color = initializeColor(vertices); 
  const queue = []; 
	//创建一个队列
	
  queue.push(startVertex); 
	//将首节点入队
  while (queue.length) {
    const v = queue.shift(); 
		//队头元素出队
    color[v] = Colors.GREY; 
		//将该元素标记为被访问过
    const neighbors = adjList.get(v); 
		//获取该元素所有的邻接节点
    for (let i in neighbors) {
      const w = neighbors[i]; 
			//依次得到邻接节点
      if (color[w] === Colors.WHITE) {
        //邻接节点还没被访问过
        queue.push(w); 
				//入队
        color[w] = Colors.GREY; 
				//将该邻接节点标记为已被访问避免重复访问
      }
    }
    color[v] = Colors.BLACK; 
		//该节点被探索过
		
    if (callback) {
      //执行要对探索过的节点执行的回调操作
      callback(v);
    }
  }
};