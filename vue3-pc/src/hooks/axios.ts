import axiosInstance from "@/assets/js/axios";
import qs from "qs";
import cookie from "js-cookie";
import $message from "@/cart/message/index";
const apikey: string = import.meta.env.VITE_API;

export default function axios() {
  let header = ref<any>({
    apikey: apikey,
    Authorization:
      "Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODY2MTg4MzUsIm5iZiI6MTY4NjYxODgzNSwiZXhwIjoxNjg2NjI5NjM1LCJkYXRhIjoiaUVwNjVsME53Q0tRWjlYcFhGUEJWUXlQNktwdWVCdWVVeHoxM2VqbUQ2ZGNpa0g0TU11SE9CYit3bWd6WVlpbiJ9.tdDr1G_W3x8pZaa-wZlMxrXoyMyBwzr5H7waukc9BXQ",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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
      headers: header.value,
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
