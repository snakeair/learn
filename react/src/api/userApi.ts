import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/**
 * createApi() 用于常见(RTKQ)中的API对象
 * fetchBaseQuery react 的一种请求方式，
 *  endpoints 指定API中的各种功能，是一个方法  build 请求构建器，用于设置请求的相关信息
 */

const userApi = createApi({
  reducerPath: "userAPI", // API标识
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:4000/api", // 请求根路径
  }), // 发送请求的工具
  endpoints(build) {
    return {
      getUser: build.query({
        // query 表示查询方法， mutation表示操作 可以理解成为一个get 一个post
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
      login: build.mutation({
        query: (data) => ({
          url: "login",
          methos: "post",
          data: data,
        }),
      }),
    };
  },
});

//  API 创建之后会自动生成一个钩子函数，构成方式是 getStu => useGetStuQuery
export const { useGetUserQuery, useSetUserMutation, useLoginMutation } =
  userApi;
export default userApi;
