import axios from "axios";
import cookie from "js-cookie";
import { ElMessage } from "element-plus";
import request from '@/assets/js/request'

const baseUrl = import.meta.env.VITE_BASE_URL
export function loginApi() {
	return {
		signIn: (data: object) => {
			return request({
				url: `${baseUrl}/user/signIn`,
				method: 'post',
				data,
			});
		},
		signOut: (data: object) => {
			return request({
				url: '/user/signOut',
				method: 'post',
				data,
			});
		},
	};
}