import axios from 'axios';

import { accessTokenInterceptorParams } from './interceptors/access-token-interceptor';

const instance = axios.create();

instance.interceptors.response.use(...accessTokenInterceptorParams);

export default instance;
