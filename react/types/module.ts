// 一些公共的ts
declare interface MSGoptions {
  msg: string;
  type?: string;
  timer?: number;
  show?: boolean;
}

interface tsAny {
  [key: string]: any;
}
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}
