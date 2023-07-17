import { ref } from "vue";

export default function useCode(
  start: number,
  end: number = 1,
  time: number = 1000
) {
  const codeH = ref<number>();
  const codeTimerH = ref<number>(start);
  const codeShowH = ref<boolean>(false);

  const codeFnH = (): void => {
    codeShowH.value = !codeShowH.value;
    let timer: number = setInterval(() => {
      if (codeTimerH.value > end) {
        codeTimerH.value--;
      } else {
        codeTimerH.value = start;
        codeShowH.value = !codeShowH.value;
        clearInterval(timer);
      }
    }, time);
  };
  return {
    codeTimerH,
    codeShowH,
    codeFnH,
    codeH,
  };
}
