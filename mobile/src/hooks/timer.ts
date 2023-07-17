import { ref } from "vue";

interface typeTime {
  fn: () => void;
  time: number;
}

export default function timer() {
  const timerFn = (call: typeTime) => {
    let timer: number = setTimeout(() => {
      call.fn();
      clearTimeout(timer);
    }, call.time);
  };
  return {
    timerFn,
  };
}
