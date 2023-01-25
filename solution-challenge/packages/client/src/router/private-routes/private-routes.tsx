import React, { useContext, useEffect } from "react";
import { Route, RouteProps } from "react-router";

import { useNavigation } from "react-router-dom";

export type PropTypes = {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
};

const PrivateRoute: React.FC<PropTypes> = ({
  children,
  ...rest
}: PropTypes) => {
  // const { isAuthenticated, loginUrl }: any = useContext() || {};
  const { isAuthenticated, loginUrl }: any = {};

  const { navigate }: any = useNavigation();

  useEffect(() => {
    if (isAuthenticated) return;

    navigate({ path: loginUrl });
  }, [isAuthenticated, navigate, loginUrl]);

  return <Route {...rest}>{isAuthenticated ? children : null}</Route>;
};

export { PrivateRoute };
