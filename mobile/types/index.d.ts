/**
 * type 定义类型，
 * interface 定义类型，可以合并其他类型
 * 定义基本类型的别名时，使用 type
 * 定义元组类型时，使用 type
 * 定义函数类型时，使用 type
 * 定义联合类型时，使用 type
 * 定义映射类型时，使用 type
 * 需要利用接口自动合并特性的时候，使用 interface
 * 定义对象类型且无需使用 type 的时候，使用 interface
 */

/**
 *  特殊例子
 *  (obj as string).length
 *  (<straing>obj).length
 *  知道obj是字符串，但是程序判断不到，可以使用as或者<>来进行类型断言
 */

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

interface typePage {
  up: boolean;
  down: boolean;
  show: boolean;
}
