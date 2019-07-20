import 'reflect-metadata';
import {
  ICommon,
  registerBindings,
  Handlers,
  _verifyProvider,
  Controllers,
  Env
} from '@serverless-di/common';
import { Container, ContainerModule } from 'inversify';
import { container } from '@serverless-di/core';
export class TestBed {
  private static _bindings: { declarations: ContainerModule; providers: ContainerModule };
  private static _module: ICommon.Module;
  private static _envs: ContainerModule;
  // create child container for inner scoped binding
  static _container: Container = container.createChild();

  static configureTestingModule(module: ICommon.Module) {
    TestBed._module = module;
    TestBed._bindings = registerBindings(module);
    // load the binding into container
    Reflect.ownKeys(TestBed._bindings).forEach((binding: any) => {
      TestBed._container.load(TestBed._bindings[binding]);
    });
  }

  static getHandler(name: string): ICommon.Handler {
    return TestBed._container.get(Handlers[name]);
  }
  static getController(name: string) {
    return TestBed._container.get(Controllers[name]['target']);
  }
  static get(key: any) {
    return TestBed._container.get(key);
  }

  static overrideProvider(provider: any, newValue: { useValue: any }) {
    if (!provider || !newValue || !newValue.useValue) {
      throw new Error(`Could not override provider!`);
    } else {
      const existingBinding = TestBed._container.get(provider);

      if (existingBinding) {
        TestBed._container.unbind(provider);
      }
      const verifiedProvider = _verifyProvider({
        provide: provider,
        useValue: newValue.useValue
      });
      const { key, value } = verifiedProvider;
      TestBed._container.bind(key).to(value);
    }
  }

  static provideEnvs(environmentVars: [{ name: string; value: string }]) {
    // bind all envs to env module
    this._envs = new ContainerModule(bind => {
      environmentVars.forEach(envVar => {
        const key = (Env[envVar.name] = Symbol.for(envVar.name));
        bind(key).toConstantValue(envVar.value);
      });
    });
    this._container.load(this._envs);
  }
  //

  static reset() {
    TestBed._container.unload(TestBed._bindings.declarations, TestBed._envs);
    // TestBed._container.unload(TestBed._bindings.providers);
    // Add  fix for unbinding providers
    !!TestBed._module && !!TestBed._module.providers && !!TestBed._module.providers.length
      ? TestBed._module.providers.forEach(provider => {
          if (typeof provider === 'object') {
            TestBed._container.unbind(provider.provide);
          } else {
            TestBed._container.unbind(provider);
          }
        })
      : '';
  }
}
