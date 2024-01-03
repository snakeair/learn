import { ref } from "vue";
import cookie from "js-cookie";
import { $get } from "@/assets/js/axios";
import pinia from "@/store/store";
import { indexStore } from "@/store/index";
const store = indexStore(pinia);

export default function isLogin() {
  const router = useRouter();
  // 判断登录
  const isLoginFnH = () => {
    let token = cookie.get("token");
    if (!token || token == "") {
      router.push({
        path: "/login",
      });
    } else {
      getLoginInfoFnH();
    }
  };
  // 获取个人信息
  const getLoginInfoFnH = () => {
  };

  return {
    isLoginFnH,
    getLoginInfoFnH,
  };
}
