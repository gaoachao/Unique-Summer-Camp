class Node {
  constructor(value, left, right) {
    this.value = value ? value : 0;
    this.left = left ? left : null;
    this.right = right ? right : null;
  }
}

class BinaryTree {
  constructor(root) {
    this.root = root ? root : null;
  }

  insert(value) {
    let newNode = new Node(value);
    if (!this.root) {
      this.root = newNode; 
			//如果树没有根节点,创建的节点就是根节点
    } else {
      //如果树有根节点，把value插入
      let currentNode = this.root; 
      let parentNode = null;
      while (true) {
        parentNode = currentNode;
        if (value < currentNode.value) {
          //如果值比当前节点值小就插入到左子节点
          currentNode = currentNode.left;
          if (!currentNode) {
          //如果左子节点为空
            parentNode.left = newNode;
            break;
          }
        } else if(value > currentNode.value){
					//为了保证每个节点的值都不相同，剔除value === currentNode.value的情况
          currentNode = currentNode.right;
          if (!currentNode) {
            parentNode.right = newNode;
            break;
          }
        } 
      }
    }
  }
}
let tree = new BinaryTree();



console.log(tree);