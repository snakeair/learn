import { ref } from "vue";

export default function scroll() {
  //禁止滚动
  const stopScrollFn = () => {
    var mo = function (e: any) {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", mo, false); //禁止页面滑动
  };
  //取消滑动限制
  const canScrollFn = () => {
    var mo = function (e: any) {
      e.preventDefault();
    };
    document.body.style.overflow = ""; //出现滚动条
    document.removeEventListener("touchmove", mo, false);
  };
  return {
    stopScrollFn,
    canScrollFn,
  };
}
