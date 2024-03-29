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

/**
 * 防抖函数
 * @param func 执行函数
 * @param delay 延迟时间 ms
 * @param immediate 是否立即执行
 */
export const debounce = (
  func: Function,
  delay: number,
  immediate: boolean = false
) => {
  let timer: number | undefined;

  return function (this: unknown, ...args: any[]) {
    let that = this;
    if (immediate) {
      func.apply(that, args); // 确保引用函数的指向正确，并且函数的参数也不变
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(that, args);
    }, delay);
  };
};

// 节流
export const throttle = (fn: Function) => {
  let timer: number | null; // 首先设定一个变量，没有执行定时器时,默认为 null
  return function (this: unknown) {
    if (timer) return; // 当定时器没有执行的时候timer永远是false,后面无需执行
    let that = this;
    timer = setTimeout(() => {
      fn.apply(that, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)
      // 表示可以执行下一次循环了。
      timer = null;
    }, 1000);
  };
};

// dataurl 为传进来的base64格式的图片地址， return 返回的为file格式
export const toFileFn = (dataurl: string, filename:string) => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  let suffix = mime.split("/")[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
};


type element = HTMLElement
// NOTE block 窗口对齐位置，start上 end 下 center 中间
export const scrollToTop = (element : element, line?: 'start' ) => {
  element.scrollIntoView({ behavior: "smooth", block: line });
}