import 'reflect-metadata';
import { Table } from '../aws/table.service';
import { SDK_CONFIG, AWS } from '../../../core/src/constants';
import { GLOBALS, HANDLERS, CONTROLLERS, ENV } from '../../../core/src/constants';
import { interfaces, ContainerModule, decorate, injectable, METADATA_KEY } from 'inversify';
import { ICommon } from '../interfaces';
import { setAwsConfig } from './common';

export function registerBindings(object: ICommon.Module) {
  let bindings = <any>{};
  const keys = Reflect.ownKeys(object);
  Reflect.ownKeys(object).forEach(prop => {
    if (object[prop]) {
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
          bindings['datasources'] = registerDatasources(object[prop], object.config);
          break;
        }
        case 'environment': {
          bindings['environment'] = registerEnvironment(object[prop]);
          break;
        }
        case 'config': {
          // load credentials into sdk
          if (object[prop]['accessKeyId'] && object[prop]['secretAccessKey']) {
            setAwsConfig(object.config);
            bindings['config'] = new ContainerModule(bind => {
              bind(SDK_CONFIG).toConstantValue(true);
            });
          } else {
            console.warn(`No AWS config provided, some services may not work properly!`);
            bindings['config'] = new ContainerModule(bind => {
              bind(SDK_CONFIG).toConstantValue(false);
            });
          }
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

function registerDatasources(datasources: ICommon.Datasources, config: ICommon.Config) {
  return new ContainerModule(bind => {
    // Currently only handles dynamoDB tables
    _bindDynamoDBTables(datasources.dynamoDB, bind, config);
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
        `${declaration.name} is not a valid Handler or controller, Make sure that class has "@Handler" or "@Controller" decorator.`
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

function _bindDynamoDBTables(
  dynamoTables: Array<ICommon.Table>,
  bind: interfaces.Bind,
  config: ICommon.Config
) {
  dynamoTables.forEach(table => {
    // This will return a dynamoTable instance with gitven configuration
    bind(AWS.Table)
      .toDynamicValue(() => {
        const dbTable: Table = new Table();
        dbTable.init(table.name, table.region || config.region, table.primaryKeys, table.options);
        return dbTable;
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
