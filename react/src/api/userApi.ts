import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/**
 * // NOTE: createApi() 用于常见(RTKQ)中的API对象
 * // NOTE: fetchBaseQuery react 的一种请求方式，
 * // NOTE: endpoints 指定API中的各种功能，是一个方法  build 请求构建器，用于设置请求的相关信息
 */

let headers = {
  "Content-Type": "application/json",
};

interface loginTs {
  [key: string]: string | number | undefined;
  mobile: number;
  code: number;
  name?: string;
}

const userApi = createApi({
  reducerPath: "userAPI", // API标识
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/api", // 请求根路径
  }),
  // NOTE: 发送请求的工具
  endpoints(build) {
    // NOTE:  build是一个构建器，用于设置请求信息，默认参数
    return {
      // NOTE: query 表示查询方法， mutation表示操作 可以理解成为一个get 一个post
      tologin: build.mutation({
        query: (data) => ({
          url: "user",
          method: "POST",
          data: data,
        }),
      }),
      getUser: build.query({
        // NOTE: user 是请求路径与baseUrl组合，{id:number} 是请求的参数
        query: ({ id: number }) => "user",
      }),
      setUser: build.mutation({
        query: (data) => ({
          url: "user",
          method: "post",
          data: data,
        }),
        // transformErrorResponse 仅返回 res中的data
        transformErrorResponse(baseQueryReTrurnValue) {
          return baseQueryReTrurnValue.data;
        },
      }),
    };
  },
});

// NOTE: API 创建之后会自动生成一个钩子函数，构成方式是 getStu => useGetStuQuery ，我们使用 useGetStuQuery 请求数据
// INFO: useGetStuQuery 构成， use表示钩子方法，query表示请求方式，中间是自己命名的请求内容
export const { useGetUserQuery, useSetUserMutation, useTologinMutation } =
  userApi;
export default userApi;
