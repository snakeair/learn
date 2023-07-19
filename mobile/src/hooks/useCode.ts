import { ref } from "vue";

export default function useCode(
  start: number,
  end: number = 1,
  time: number = 1000
) {
  const code = ref<number>();
  const codeTimer = ref<number>(start);
  const codeShow = ref<boolean>(true);

  const codeFn = (): void => {
    codeShow.value = !codeShow.value;
    let timer: number = setInterval(() => {
      if (codeTimer.value > end) {
        codeTimer.value--;
      } else {
        codeTimer.value = start;
        codeShow.value = !codeShow.value;
        clearInterval(timer);
      }
    }, time);
  };
  return {
    codeTimer,
    codeShow,
    codeFn,
    code,
  };
}
