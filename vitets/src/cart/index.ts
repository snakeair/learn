import type { App } from "vue";
import message from "./message/message";
//引入 message组件

/**
 * 单个组件引入
 * message.install = function (): void {};
 *
 *  // 声明message 可以直接用use引入
 *  export { message };
 *
 */

// 批量引入
const plugins = [message];

const install = (app: App) => {
  plugins.forEach((plugin) => {
    app.use(plugin as any);
  });
};

export default { install };
