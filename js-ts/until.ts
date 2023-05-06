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
