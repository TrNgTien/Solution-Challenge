import {
  createContainer,
  InjectionMode,
  AwilixContainer,
  asValue,
  asClass,
} from "awilix";
import { chain } from "lodash";
import { AppContext, Config } from "./bounded-context/type";
import { Database } from "./interface/db/database";
import { User } from "./interface/low-level/user/user-entity";
import { IConfiguration } from "./interface/utils/configuration/configuration";

import { validationSchemas } from "./interface/utils/validator";

type AppContainer = AwilixContainer;
const systemContext: AppContext = {
  user: new User({
    id: 1000000000,
    email: "super.admin@yomedia.vn",
    password: "$2b$10$K6dEMjPZeHKoJuCd3aAFHeHuyhkxnWMEyNJLG0LKeRUNE0va/.xZC",
    firstName: "Super",
    lastName: "Admin",
    status: 1,
  }),
  transaction: null,
  token: null,
};

const container: AppContainer = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

/**   
  @summary Load all the class for injection in workflows
*/
container
  .loadModules(["./interface/services/locale-service/locale-service.ts"], {
    cwd: __dirname,
    formatName: "camelCase",
    resolverOptions: {
      lifetime: "SINGLETON",
      register: asClass,
    },
  })
  // Load error factories & query factories & helpers
  .loadModules(
    [
      "./interface/error/error-factory.ts",
      "./interface/error/error-type/*-error.js",
      "./interface/utils/helpers/*-helper.ts",
      "./interface/low-level/entity-factory.ts",
      "./interface/db/queries/query-factory.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  //Load loggers
  .loadModules(
    [
      "./interface/utils/logger/logger-factory.ts",
      "./interface/utils/logger/logger-type/*-logger.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  .loadModules(
    [
      "./interface/utils/validator/validator.ts",
      "./interface/utils/validator/validator-error-parser.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  // Load repositories & mappers
  .loadModules(
    [
      "./bounded-context/repo/mysql/**/*-repository.ts",
      "./bounded-context/repo/mysql/**/*-mapper.ts",
      "./bounded-context/repo/mysql/base-mysql-repository.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SCOPED",
        register: asClass,
      },
    }
  )
  // Inject default system context into repositories
  .loadModules(
    [
      [
        "./bounded-context/repo/mysql/**/*-repository.ts",
        <any>{ injector: () => ({ appContext: systemContext }) },
      ],
      [
        "./bounded-context/repo/mysql/base-mysql-repository.ts",
        <any>{ injector: () => ({ appContext: systemContext }) },
      ],
    ],
    {
      cwd: __dirname,
      formatName: (name) => {
        // sample format: systemUserRepository
        return `system${chain(name).camelCase().upperFirst().value()}`;
      },
      resolverOptions: {
        lifetime: "SCOPED",
        register: asClass,
      },
    }
  )
  .loadModules(
    [
      "./interface/utils/configuration/configuration.ts",
      "./interface/utils/configuration/configuration-mapper.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  //load Email Sender
  .loadModules(
    [
      "./interface/utils/senders/sender-type/email-sender.ts",
      "./interface/utils/senders/sender-type/sender.ts",
      "./interface/utils/senders/senders-builder.ts",
      "./interface/utils/senders/sender-parser.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  // Load routes
  .loadModules(
    [
      "./bounded-context/repo/server/routes/*-router.ts",
      "./bounded-context/repo/server/router.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  // Load controllers & handlers
  .loadModules(
    [
      "./app/controller/*-controller.ts",
      "./app/middleware/handlers/*-handler.ts",
      "./app/middleware/handlers/oauth-handler/base-oauth-handler.ts",
      "./app/middleware/handlers/oauth-handler/google-oauth-handler.ts",
      "./app/middleware/handlers/oauth-handler/facebook-oauth-handler.ts",
      "./app/middleware/context-binder.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SCOPED",
        register: asClass,
      },
    }
  )
  //Load workflows
  .loadModules(
    [
      "./app/workflow/*-workflow/*-workflow.ts",
      "./app/workflow/generate-token/generate-token.ts",
      "./app/workflow/register-account/register-account.ts",
      "./app/workflow/two-factor-authentication/two-factor.ts",
      "./app/workflow/verify-account/verify-account.ts",
      "./app/workflow/resend-hashcode/resend-hashcode.ts",
      "./app/workflow/oauth/google/redirect-google-uri.ts",
      "./app/workflow/oauth/google/get-google-token.ts",
      "./app/workflow/oauth/facebook/redirect-facebook-uri.ts",
      "./app/workflow/oauth/facebook/get-facebook-token.ts",
      "./app/workflow/permissions-workflow/create-roles.ts",
      "./app/workflow/permissions-workflow/create-groups.ts",
      "./app/workflow/permissions-workflow/create-permissions.ts",
      "./app/workflow/permissions-workflow/check-permission.ts",
      "./app/workflow/permissions-workflow/find-all-permissions.ts",
      "./app/workflow/permissions-workflow/add-with-association/*-workflow.ts",
      "./app/workflow/user-profile-workflow/*-workflow.ts",
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SCOPED",
        register: asClass,
      },
    }
  )
  //Load server
  .loadModules(
    ["./bounded-context/repo/server/server.ts", "./app/application.ts"],
    {
      cwd: __dirname,
      formatName: "camelCase",
      resolverOptions: {
        lifetime: "SINGLETON",
        register: asClass,
      },
    }
  )
  // Register default values, inject db to repositories
  .register({
    appContext: asValue({}),

    db: asClass(Database).singleton(),
    validationSchemas: asValue(validationSchemas),
  });

if (process.env.NODE_ENV === "development") {
  console.log(`module loaded: `, JSON.stringify(container.registrations));
}

const config = container.resolve<IConfiguration>(`configuration`).get(`config`);
container.register({
  config: asValue(config),
});

const models = container.resolve<Database>("db").getModels();

container.register({
  dbModels: asValue(models),
});

export { container, AppContainer, models };
