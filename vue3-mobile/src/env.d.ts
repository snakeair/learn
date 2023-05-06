/// <reference types="vite/client" />
//三斜杠指令是包含单个XML标签的单行注释，注释的内容会做为编译器指令使用，只有在文件的最顶部才会生效

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
