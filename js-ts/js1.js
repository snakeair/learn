let firm = [
  { id: 0, pid: 1000, name: "0" },
  { id: 1, pid: 1000, name: "1" },
  { id: 2, pid: 1, name: "1-2" },
  { id: 4, pid: 2, name: "1-2-4" },
  { id: 3, pid: 1, name: "1-3" },
  { id: 6, pid: 3, name: "1-3-6" },
  { id: 5, pid: 0, name: "0-5" },
  { id: 8, pid: 4, name: "1-2-4-8" },
  { id: 7, pid: 4, name: "1-2-4-7" },
  { id: 9, pid: 5, name: "0-5-9" },
];
let size = 0;
//二维数据转树形数据
const treeFn = (pid, data) => {
  let arr = data.filter((el) => {
    if (el.pid === pid) {
      el["children"] = treeFn(el["id"], data);
      return el;
    }
  });
  return arr;
};
let tree = treeFn(1000, firm);
console.log(tree);

// 树形数据删除
const delFn = (id, data) => {
  if (data.length === 0) {
    return [];
  }
  let arr = data.filter((el) => {
    if (el["id"] !== id) {
      el["children"] = delFn(id, el["children"]);
      return el;
    } else if (el["id"] === id && el["children"].length > 0) {
      return [];
    }
  });
  return arr;
};
let newTree = delFn(6, tree);
console.log("new", newTree);
