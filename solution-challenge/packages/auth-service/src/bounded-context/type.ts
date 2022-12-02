import Mail from "nodemailer/lib/mailer";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { Transaction } from "sequelize/types";
import { QueryTransaction } from "../interface/db/type";
import { User } from "../interface/low-level/user/user-entity";


export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
};

export type MailServerOptions = SMTPConnection.Options

// export type MailContent = {
//   from: string,
//   to: string,
//   subject: string,
//   text: string
// }

export type MailContent = Mail.Options

export type MailServerConfig = {
  host : string,
  port: number,
  user: string,
  pass: string,
  other? : any

}

export type Config = {
  http: {
    port: number;
  };
  debug: {
    level: string;
    rootNamespace: string;
  };
  db: DatabaseConfig;
  logger?: any;
  smtp: MailServerConfig,
  locale: {
    default: string,
    support: string[],
    dir: string
  }
};

export type Criteria = {
  select?: string[];
  filters?: Filter[];
  sort?: Sort;
  offset?: number;
  limit?: number;
  includes?: Include[];
  transaction?: any;
};

export type PaginateResult<TEntity = any> = {
  docs: TEntity[];
  total: number;
  limit: number;
  offset: number;
};

export type Filter = {
  code: string;
  operator: Operator;
  value: string | number | (string | number)[];
};

export type Operator =
  | 'is_greater_than'
  | 'is_smaller_than'
  | 'contains'
  | 'does_not_contain'
  | 'contains_case_insensitive'
  | 'does_not_contain_case_insensitive'
  | 'is'
  | 'is_not'
  | 'equals'
  | 'does_not_equal'
  | 'array_contains'
  | 'starts_with'
  | 'ends_with';

export const enum Operators {
  IsGreaterThan = 'is_greater_than',
  IsSmallerThan = 'is_smaller_than',
  Contains = 'contains',
  DoesNotContain = 'does_not_contain',
  ContainsCaseInsensitive = 'contains_case_insensitive',
  DoesNotContainCaseInsensitive = 'does_not_contain_case_insensitive',
  Is = 'is',
  IsNot = 'is_not',
  Equals = 'equals',
  DoesNotEqual = 'does_not_equal',
  ArrayContains = 'array_contains',
  StartsWith = 'starts_with',
  EndsWith = 'ends_with',
}

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortDirection = 'asc' | 'desc';

export type Sort = {
  column: string;
  direction?: SortDirection;
};

export type Include = {
  field: string;
  select?: string[];
  includes?: Include[];
  filters?: Filter[];
};

export type EntityType = 'user' | 'userProfile' | 'role' | 'group' | 'permission' | 'client' | 'hashcode';

export enum EntityTypes {
  User = 'user',
  UserPofile = 'userProfile',
  Role = 'role',
  Group = 'group',
  Permission = 'permission',
  Client = 'client',
  Hashcode = 'hashcode'
}

export type HttpError = Error & {
  status: number;
  type: string;
  details: { [key: string]: any };
};

export type AppContext = {
  user: User;
  token?: string;
  transaction: Transaction;
};

export enum EntityStatuses {
  Active = 1,
  Inactive = 2,
  Deleted = -1,
}

export enum AccountTypes {
  Surveyor = 1,
  Client = 2
}

