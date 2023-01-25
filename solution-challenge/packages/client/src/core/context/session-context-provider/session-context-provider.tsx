import React from 'react';

import { SessionContext } from '../session-context/session-context';
import { COOKIE, useCookies } from '../../cookie-util';

type PropTypes = {
  loginUrl: string;
  children: React.ReactNode
};

const SessionContextProvider: React.FC<PropTypes> = ({ children, loginUrl }) => {
  const { cookies, removeCookies } = useCookies();

  const userEmail = cookies[COOKIE.USER] || '';

  const removeAuthCookies = () => {
    removeCookies(...Object.values(COOKIE));
  };

  const contextData = {
    loginUrl,
    data: { userEmail },
    isAuthenticated: !!userEmail,
    removeAuthCookies,
  };

  return <SessionContext.Provider value={contextData}>{children}</SessionContext.Provider>;
};

export { SessionContextProvider };
