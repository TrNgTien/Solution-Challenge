import { useState } from 'react';
import Cookies from 'js-cookie';

type UseCookieHookOutput = {
  cookies: { [key: string]: any };
  setCookie: (cookieName: string, cookieValue: string) => void;
  removeCookies: (...cookieNameList: string[]) => void;
};

export const useCookies = (): UseCookieHookOutput => {
  const [cookies, setCookiesValue] = useState(Cookies.get());

  const setCookie = (cookieName: string, newValue: string) => {
    Cookies.set(cookieName, newValue);
    setCookiesValue(Cookies.get());
  };

  const removeCookies = (...cookieNameList: string[]) => {
    cookieNameList.forEach((cookieName: string) => Cookies.remove(cookieName));
    setCookiesValue(Cookies.get());
  };

  return { cookies, setCookie, removeCookies };
};
