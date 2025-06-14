import axios from 'axios';

// 匯出 request 函數
export function request(config) {
  
  // 建立axios實例
  const instance = axios.create({
    
    baseURL: `${process.env.VUE_APP_API_BASEURL}:${process.env.VUE_APP_PORT}`,

    timeout: 10000,
  });

  // console.log(instance.defaults);

  // 攔截請求
  instance.interceptors.request.use(function (config) {
    // 請求前
    //console.log(config);
    return config;
  }, function (error) {
    // 請求失敗
    if (error.response.status === 500) {
      console.log('伺服器出錯');
    }
    return Promise.reject(error);
  });

  // 攔截回應
  instance.interceptors.response.use(function (response) {
    // 回應前
    return response;
  }, function (error) {
    // 回應失敗時做什麼
    return Promise.reject(error);
  });

  return instance(config);
}