// import type { AxiosError, AxiosResponse } from 'axios';
// import type Http from './core';
// import type { Functionable } from './types';

// export default function authenticate(option:{

// }) {
//   function handleAuthFailure(error) {
//     // 处理认证失败的逻辑
//     console.error('Authentication failed:', error);
//   }

//   return function authenticate(http: Http) {
//     http.inst.interceptors.response.use(
//       function success(response) {
//         if (response.data.code === 401) {
//             handleAuthFailure()
//           return Promise.reject(response);
//         }
//         return response;
//       },
//       function fail(error: AxiosError) {
//         if (error.status === 401) {
//             handleAuthFailure()
//         }
//         return Promise.reject(error);
//       },
//     );
//   };
// }
