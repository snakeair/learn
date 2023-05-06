import axios from "axios";
import qs from "qs";

export let url = window.location.href;
export let apikey: string = "";
export let requestUrl: string = "";

if (import.meta.env.VITE_APP_TITLE == "prop") {
  apikey = "ZlEqSzeQo1xEo0W3Rqh7t3x8d77UwR3O";
  requestUrl = "https://kong.gbicom.com:8443/empsaas";
} else {
  requestUrl = "http://kong.d.gbicom.com/empsaas";
  apikey = "592255fd1ca345118376d7bef6e19202";
}

interface reqTs {
  [key: string]: any;
}

const pendingRequest = new Map();

function generateReqKey(config: reqTs) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

function addPendingRequest(config: reqTs) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel: reqTs) => {
      console.log(pendingRequest.has(requestKey));
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config: reqTs) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    pendingRequest.delete(requestKey);
  }
}

export const http = () => {
  let header = {
    apikey: apikey,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
  const instance = axios.create({
    baseURL: requestUrl,
    headers: header,
    timeout: 20000,
  });

  // 拦截器防止重复请求
  instance.interceptors.request.use(
    function (config) {
      removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求
      addPendingRequest(config); // 把当前请求添加到pendingRequest对象中
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    (error) => {
      removePendingRequest(error.config || {}); // 从pendingRequest对象中移除请求
      if (axios.isCancel(error)) {
        console.log("已取消的重复请求：" + error.message);
      } else {
        // 添加异常处理
      }
      return Promise.reject(error);
    }
  );
  return {
    http: instance,
    post(url: string, data: object) {
      return this.http({
        method: "post",
        url,
        data: qs.stringify(data),
      });
    },
    put(url: string, data: object) {
      return this.http({
        method: "put",
        url,
        params: data,
      });
    },
    delete(url: string, data: object) {
      return this.http({
        method: "delete",
        url,
        params: data,
      });
    },
    get(url: string, data: object) {
      return this.http({
        method: "get",
        url,
        params: data,
      });
    },
    upload(url: string, data: any) {
      return this.http({
        method: "post",
        url,
        data: data,
      });
    },
  };
};
