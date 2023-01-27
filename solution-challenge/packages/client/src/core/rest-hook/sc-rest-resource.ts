import {  Entity, Resource } from '@rest-hooks/rest';
import Cookies from 'js-cookie';
import { AxiosRequestHeaders, AxiosResponse, Method } from 'axios';

import axios from './axios';

export abstract class SCRestResource extends Entity {
    
  static async fetch(input: RequestInfo, init: RequestInit): Promise<any> {
    const response: AxiosResponse = await this.fetchWithAxios(input, init);

    return response.data;
  }

  private static async fetchWithAxios(input: RequestInfo, init: RequestInit) {
    const headers = {
      'Content-Type': 'application/json',
    };

    return axios({
      method: (init.method || 'get') as Method,
      url: input as string,
      headers,
      withCredentials: true,
      data: init.body,
    });
  }
}
