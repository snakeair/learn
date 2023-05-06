import { ref } from "vue";

export default function useCode(
  start: number,
  end: number = 0,
  time: number = 1000
) {
  const codeH = ref<number>(start);
  const codeShowH = ref<boolean>(false);

  const codeFnH = (): void => {
    let timer: number = setInterval(() => {
      if (codeH.value > end) {
        codeH.value--;
      } else {
        codeH.value = start;
        clearInterval(timer);
      }
    }, time);
  };
  return {
    codeH,
    codeShowH,
    codeFnH,
  };
}
