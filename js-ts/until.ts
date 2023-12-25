interface objTs {
  [key: string]: any;
}

// 判断对象是否相等，如果相等返回true 不相等返回false;
export const objJubgeAsFn = (obj1: objTs, obj2: objTs): boolean => {
  if (Object.keys(obj1).length == 0 && Object.keys(obj2).length == 0) {
    return true;
  }
  for (let key in obj1) {
    if (typeof obj1[key] == "object") {
      return objJubgeAsFn(obj1[key], obj2[key]);
    } else if (obj1[key] != obj2[key]) {
      return false;
      break;
    }
  }
  return true;
};

// 深拷贝
export const clone = (target: objTs, map = new Map()) => {
  if (typeof target === "object") {
    let cloneTarget: any = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
};

console.log(123);

const removeFn = () => {
  console.log("remove");
  let selection = window.getSelection();
  var range = document.createRange();
  // selection.toString();       //获取用户选择的文本内容
  selection.deleteFromDocument(); //清除鼠标获取元素的内容
};
const replaceFn = () => {
  let selection = document.getSelection();
  let start = selection.anchorOffset; // 选中字符的第一个为止
  let end = selection.focusOffset; // 选中字符的最后一个为止
  selection.deleteFromDocument();
  let node = selection.anchorNode;
  console.log(node);
};

const focusFn = () => {
  let position = {};
  var selection = document.getSelection();
  var range = document.createRange();
  // var rangeDivDom = document.querySelector('#range-div')
  // var rangeText = rangeDivDom.firstChild
  // range.setStart(rangeText, position.anchorOffset)
  // range.setEnd(rangeText, position.focusOffset)
  // selection.removeAllRanges()
  selection.addRange(range);
};
