import { DynamoDB } from '../aws/dynamoDB.service';
import { AWS } from '../../../core/src/constants';
import { GLOBALS, HANDLERS, CONTROLLERS, ENV } from '../../../core/src/constants';
import { interfaces, ContainerModule, decorate, injectable, METADATA_KEY } from 'inversify';
import { ICommon } from '../interfaces';

export function registerBindings(object: ICommon.Module) {
  let bindings = <any>{};
  Reflect.ownKeys(object).forEach(prop => {
    if (object[prop].length) {
      // When there are values inside decorators
      switch (prop) {
        case 'declarations': {
          bindings['declarations'] = registerDeclarations(object[prop]);
          break;
        }
        case 'providers': {
          bindings['providers'] = registerProviders(object[prop]);
          break;
        }
        case 'datasources': {
          bindings['datasources'] = registerDatasources(object[prop]);
          break;
        }
        case 'environment': {
          bindings['environment'] = registerEnvironment(object[prop]);
          break;
        }
        case 'config': {
          bindings['config'] = registerConfig(object[prop]);
          break;
        }
        default: {
          console.log(
            `${JSON.stringify(prop)} is not supported as a property of module, it will be ignored. `
          );
          break;
        }
      }
    }
  });
  return bindings;
}
function registerDeclarations(declarations: any[]) {
  return new ContainerModule(bind => {
    _bindDeclarations(declarations, bind);
  });
}

function registerProviders(providers: any[]) {
  return new ContainerModule(bind => {
    _bindProviders(providers, bind);
  });
}

function registerDatasources(datasources: ICommon.Datasources) {
  return new ContainerModule(bind => {
    // Currently only handles dynamoDB tables
    _bindDynamoDBTables(datasources.dynamoDB, bind);
  });
}

function registerEnvironment(envVars: string[]) {
  return new ContainerModule(bind => {
    envVars.forEach(env => {
      const key = (ENV[env] = Symbol.for(env));
      bind(key).toConstantValue(process.env[ENV] || '');
    });
  });
}

function registerConfig(config: ICommon.Config) {
  return new ContainerModule(bind => {
    // TODO
    // Fetch and set aws creds to aws sdk
  });
}

function _bindDeclarations(declarations: any[], bind: interfaces.Bind) {
  declarations.forEach(declaration => {
    // If declaration has @Handler decorator
    if (Reflect.hasOwnMetadata(GLOBALS.SHARED_HANDLER, declaration)) {
      // Add declaration to HANDLERS Identifier
      const key = (HANDLERS[declaration.name] = Symbol.for(declaration.name));
      bind(key).to(Reflect.getOwnMetadata(GLOBALS.SHARED_HANDLER, declaration));
      // If declaration has @Controller decorator
    } else if (Reflect.hasOwnMetadata(GLOBALS.SHARED_CONTROLLER, declaration)) {
      CONTROLLERS[declaration.name] = {};
      // Add declaration to CONTROLLERS Identifier
      const targetKey = (CONTROLLERS[declaration.name]['target'] = Symbol.for(declaration.name));
      const METHODSKey = (CONTROLLERS[declaration.name]['METHODS'] = Symbol.for(
        `${declaration.name}METHODS`
      ));
      const controller = Reflect.getOwnMetadata(GLOBALS.SHARED_CONTROLLER, declaration);
      bind(targetKey).to(controller['target']);
      bind(METHODSKey).toConstantValue(controller['METHODS']);
    } else {
      throw new Error(
        `${
          declaration.name
        } is not a valid Handler or controller, Make sure that class has "@Handler" or "@Controller" decorator.`
      );
    }
  });
}

function _bindProviders(providers: any[], bind: interfaces.Bind) {
  providers.forEach((provider: any) => {
    if (typeof provider === 'object') {
      const verifiedProvider = verifyProvider(provider);
      const { key, value } = verifiedProvider;
      bind(key).to(value);
    } else {
      const getInjectable = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, provider);
      console.log(getInjectable);
      if (!getInjectable) {
        decorate(injectable(), provider);
      }
      bind(provider).toSelf();
    }
  });
}

function _bindDynamoDBTables(dynamoTables: Array<ICommon.Table>, bind: interfaces.Bind) {
  dynamoTables.forEach(table => {
    bind(AWS.DynamoDB)
      .toFactory(() => {
        return () => new DynamoDB(table.name, table.region);
      })
      .whenTargetNamed(table.name);
  });
}

export function verifyProvider(provider) {
  if (provider.provide && provider.useValue) {
    const key = provider.provide;
    const value = provider.useValue;
    const getInjectable = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, provider.useValue);
    console.log(getInjectable);
    if (!getInjectable) {
      decorate(injectable(), provider.useValue);
    }
    return {
      key,
      value
    };
  } else {
    throw new Error('Could not bind provider, "provider" or "useValue" property is undefined');
  }
}
