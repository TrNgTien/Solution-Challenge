import { Resource, Method } from '@rest-hooks/legacy';
import Cookies from 'js-cookie';
import {  AxiosResponse } from 'axios';

import axios from './axios';

export abstract class SCResource extends Resource {
  static getFetchInit(options: RequestInit): RequestInit {
    return {
      ...options,
      credentials: 'same-origin',
      headers: {
        ...options.headers,
      },
    };
  }

  static async fetch(method: Method, url: string, body?: Readonly<object | string>): Promise<any> {
    const response: AxiosResponse = await this.fetchWithAxios(method, url, body);

    return response.data;
  }

  private static async fetchWithAxios(method: Method, url: string, body?: Readonly<object | string>) {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    return axios({
      method,
      url,
      headers,
      withCredentials: true,
      data: body,
    });
  }
}
