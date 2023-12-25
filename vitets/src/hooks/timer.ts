import { ref } from "vue";

export default function timer(t:number) {
  const timerFn = (call: Function) => {
    let timer: number = setTimeout(() => {
      call();
      clearTimeout(timer);
    }, t);
  };
  return {
    timerFn,
  };
}
