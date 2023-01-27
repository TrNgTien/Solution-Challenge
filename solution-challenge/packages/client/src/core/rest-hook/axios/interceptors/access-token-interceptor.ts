/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';

import { AxiosNetworkError } from '../errors';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const onSuccess = (response: AxiosResponse) => response;

const onError = async (error: any) => {
  const originalRequestConfig = error?.config;
  if (error?.response?.status === 401 && !originalRequestConfig?._retry) {
    if (isRefreshing) {
      try {
        await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });

        return axios(originalRequestConfig);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    originalRequestConfig._retry = true;
    isRefreshing = true;

    return new Promise((resolve, reject) => {
      axios
        .post('/refresh-token-url')
        .then(() => {
          processQueue(null);
          resolve(axios(originalRequestConfig));
        })
        .catch((err: any) => {
          console.error(err);

          // If updating the token fails
          // we create a 401 error and redirect to the login page
          const correctedError = new AxiosNetworkError({ status: 401 } as any);

          processQueue(correctedError);
          reject(correctedError);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  }

  return Promise.reject(new AxiosNetworkError(error));
};

type SuccessCallbackType = (response: AxiosResponse) => AxiosResponse;
type ErrorCallbackType = (error: any) => Promise<any>;

const accessTokenInterceptorParams: [SuccessCallbackType, ErrorCallbackType] = [onSuccess, onError];

export { accessTokenInterceptorParams };
