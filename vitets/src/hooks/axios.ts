import axiosInstance from "@/assets/js/axios";
import qs from "qs";
import cookie from "js-cookie";
import $message from "@/cart/message/index";
const apikey: string = import.meta.env.VITE_API;

export default function axios() {
  let header = ref<any>({
    apikey: apikey,
    Authorization: "123456",
    "Content-Type": "multipart/form-data",
  });
  // 调用登陆之后刷新页面，不然无法获取token
  const $get = (url: string, data?: object) => {
    return axiosInstance.get(url, { params: data });
  };

  const $post = (url: string, data: object) => {
    return axiosInstance({
      method: "POST",
      url: url,
      data: qs.stringify(data),
      headers: header,
    });
  };

  const $del = (url: string, data: object) => {
    return axiosInstance.delete(url, qs.stringify(data));
  };

  const $put = (url: string, data: object) => {
    return axiosInstance.put(url, qs.stringify(data));
  };

  return { header, $get, $post, $del, $put };
}
