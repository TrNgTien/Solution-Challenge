import { AxiosResponse } from 'axios';

export class AxiosNetworkError extends Error {
  status: number;
  response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.status = response.status;
    this.response = response;
  }
}
