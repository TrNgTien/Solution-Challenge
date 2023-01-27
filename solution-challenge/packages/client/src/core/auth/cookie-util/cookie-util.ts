import Cookies from 'js-cookie';

export enum COOKIE {
    TOKEN = 'auth-token',
    USER = 'user'
}

export const isCurrentUser = (email: string) => {
  const userEmail = Cookies.get(COOKIE.USER);
  return userEmail?.toLowerCase() === email.toLowerCase();
};
