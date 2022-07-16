//字符串转换函数
function defaultToString(key) {
  if (key === null) {
    return "NULL";
  } else if (key === undefined) {
    return "UNDEFINED";
  } else if (typeof key === "string" || key instanceof String) {
    return `${key}`;
  }
  return key.toString();
}

//ValuePair类
class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `#${this.key} : ${this.value}`; 
		//重写toString方法让其输出键值对
  }
}

//字典类
class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    //用于将键值转换为字符串
    this.table = {};
    //存放键值对,保存为table[key]={key,value}
  }

  //判断字典是否含有key
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  //根据键值对设置键和值
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      //将key转化为字符串
      this.table[tableKey] = new ValuePair(tableKey, value);
      //给table对象设置table属性
      return true;
    }
    return false; 
		//传入值不正确返回false
  }

  remove(key) {
    //从字典里删除键值对
    if (this.hasKey(this.toStrFn(key))) {
      delete this.table[this.toStrFn(key)]; 
			//删除table中的key属性
      return true;
    }
    return false; 
		//找不到要删除的key值就delete
  }

  //从字典中检索值
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  //ES7方法，返回table中所有ValuePair对象
  keyValues() {
    return Object.values(this.table);
  }

  //获取所有的key值
  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }

  //获取了所有的value值
  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues(); 
		// 获取全部键值对
    for (let i = 0; i < valuePairs.length; i++) {
      // 遍历每一个键值对
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value); 
			// 执行要对键值对进行的回调操作
      if (result === false) {
        break; 
      }
    }
  }

  //返回字典中值的个数
  size() {
    return Object.keys(this.table).length;
  }

  //判断字典是否为空
  isEmpty() {
    return this.size() === 0;
  }

  //清空字典
  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) {
      //如果为空则返回空字符串
      return "";
    }
    const valuePairs = this.keyValues(); 
		//获取全部键值对
    let objString = `${valuePairs[0].toString()}`; 
		// 对第一个键值对字符串化
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`; 
			// 将剩下的键值对依次字符串化并拼接起来
    }
    return objString; 
		// 返回拼接的结果
  }
}

export default Dictionary;
