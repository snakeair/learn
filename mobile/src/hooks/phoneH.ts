import { ref } from "vue";

export default function phone() {
  const phone = ref<string>("");
  const phoneFn = (): boolean => {
    const reg = /^(1[3|4|5|6|7|8|9])[\d]{9}$/g;
    return reg.test(phone.value);
  };
  return {
    phone,
    phoneFn,
  };
}
