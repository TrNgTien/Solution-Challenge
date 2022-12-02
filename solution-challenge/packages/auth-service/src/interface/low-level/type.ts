import {
  Router as HttpRouter,
  Request,
  Response as HttpResponse,
  ErrorRequestHandler,
  NextFunction,
  RequestHandler,
} from "express";
import { ServerResponse } from "http";
import { AppContext } from "../../bounded-context/type";
import { AppContainer } from "../../container";

type HttpRequest = Request & {
  container: AppContainer;
  appContext: AppContext;
};

type TokenPayloadAccount = {
  id: number;
  name: string;
  email: string;
  type: number;
  adminId?: number;
  brandId?: number;
  companyId?: number;
  permissions: string[];
};

type TokenPayload = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // isSuperAdmin: boolean;
  // isSwitchedAccount: boolean;
  // originalAccount: TokenPayloadAccount;
  // account: TokenPayloadAccount;
  iat: number;
  exp: number;
};

type ControllerResult = {
  httpCode?: number;
  headers?: { [key: string]: string };
  content: any;
};

export {
  HttpRouter,
  HttpRequest,
  HttpResponse,
  ServerResponse,
  ErrorRequestHandler,
  NextFunction,
  RequestHandler,
  TokenPayloadAccount,
  TokenPayload,
  ControllerResult
};
