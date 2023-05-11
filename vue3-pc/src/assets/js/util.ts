export const phoneFn = (val: string): boolean => {
  const reg = /^(1[3|4|5|6|7|8|9])[\d]{9}$/g;
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
};

// 给 1-9 前面加 0
export function formatNumber(n: string | number) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

// yyyy-mm-dd
export function dateFn(date: any) {
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  return [year, month, day].map(formatNumber).join("-");
}

// yyy-mm-dd h:m:s
export function timeFn(date: any) {
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

// 深拷贝
export function clone(target: any, map = new Map()) {
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
}

// sessionStorage
export const sessionFn = (type: string, key: string, value: string = "") => {
  switch (type) {
    case "set":
      return sessionStorage.setItem(key, value);
      break;
    case "get":
      return sessionStorage.getItem(key);
      break;
    case "remove":
      return sessionStorage.removeItem(key);
      break;
    case "clear":
      return sessionStorage.clear();
      break;
  }
};

/***
 *  func 需要执行的方法
 *  time 间隔时间
 *  immediate 是否立即执行 —— 即是否是有防抖
 */
let debounceTimer: number | null, throttleTimer: number | null;
// 防抖
export const deFn = (fn: Function, delay: number): Function => {
  return (...args: unknown[]) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 节流
export const thrFn = (fn: Function, delay: number): Function => {
  return (...args: unknown[]) => {
    console.log(args);
    if (throttleTimer) {
      return;
    }
    throttleTimer = setTimeout(() => {
      fn.apply(this, args);
      throttleTimer = null;
    }, delay);
  };
};
