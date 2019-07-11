import { Globals, Handlers, Controllers } from '../constants';
import { interfaces, ContainerModule, decorate, injectable, METADATA_KEY } from 'inversify';
import { ICommon } from '../interfaces';

export function registerBindings(object: ICommon.Module) {
  let bindings = <any>{};
  Reflect.ownKeys(object).forEach(prop => {
    if (object[prop].length) {
      // When there are values inside decorators
      switch (prop) {
        case 'declarations': {
          bindings['declarations'] = registerDeclarations(object.declarations);
          break;
        }
        case 'providers': {
          bindings['providers'] = registerProviders(object.providers);
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

function _bindDeclarations(declarations: any[], bind: interfaces.Bind) {
  declarations.forEach(declaration => {
    // If declaration has @Handler decorator
    if (Reflect.hasOwnMetadata(Globals.SharedHandler, declaration)) {
      // Add declaration to handlers Identifier
      const key = (Handlers[declaration.name] = Symbol.for(declaration.name));
      bind(key).to(Reflect.getOwnMetadata(Globals.SharedHandler, declaration));
      // If declaration has @Controller decorator
    } else if (Reflect.hasOwnMetadata(Globals.SharedController, declaration)) {
      Controllers[declaration.name] = {};
      // Add declaration to controllers Identifier
      const targetKey = (Controllers[declaration.name]['target'] = Symbol.for(declaration.name));
      const methodsKey = (Controllers[declaration.name]['methods'] = Symbol.for(
        `${declaration.name}Methods`
      ));
      const controller = Reflect.getOwnMetadata(Globals.SharedController, declaration);
      bind(targetKey).to(controller['target']);
      bind(methodsKey).toConstantValue(controller['methods']);
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
      const verifiedProvider = _verifiedProvider(provider);
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

export function _verifiedProvider(provider) {
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
      value,
    };
  } else {
    throw new Error('Could not bind provider, "provider" or "useValue" property is undefined');
  }
}
