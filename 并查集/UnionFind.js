class UnionFind {
	constructor(count) {
			this.parent=new Array(count);
			for(let i = 0;i<count;i++) {
					this.parent[i]=i;
			}
	}
	find(p) {
			if(this.parent[p]===p) {
					return p;
			}
			this.parent[p]=this.find(this.parent[p]);
			return this.parent[p];
	}
	union(p,q) {
			let i=this.find(p);
			let j=this.find(q);
			if(i!==j) {
					this.parent[i]=j
			}
	}
	isConnected(p,q) {
			return this.find(p)===this.find(q)
	}
}
function countComponents(n,edges) {
	let count=0;
	let unionFind = new UnionFind(n);
	for(let edge of edges) {
		unionFind.union(edge[0],edge[1]);
	}
	for(let i = 0; i<n;i++) {
			if(unionFind.find(i)===i) {
					count++;
			}
	}
	return count
}
// let n=6;
// let edges=[[0, 1], [1, 2],[2,3], [4, 5]];
// console.log(countComponents(n,edges));
