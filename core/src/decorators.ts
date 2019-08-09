import 'reflect-metadata';
import { ICommon } from './interfaces';
import { GLOBALS, METHODS } from './constants';
import { decorate, injectable } from 'inversify';
import { registerBindings } from './utils/register-binding';

export function Module(object: ICommon.Module): any {
  return function(target: FunctionConstructor) {
    target.prototype['bindings'] = registerBindings(object);
  };
}

export function Controller(): any {
  return function(target: FunctionConstructor) {
    decorate(injectable(), target);
    const _METHODS = {
      GET: <any>{},
      PUT: <any>{},
      POST: <any>{},
      DELETE: <any>{},
      PATCH: <any>{},
      OPTIONS: <any>{},
      HEAD: <any>{}
    };
    // Get the metadata of each method and map it METHODS object
    Reflect.ownKeys(METHODS).forEach(method => {
      Reflect.ownKeys(METHODS[method]).forEach(key => {
        _METHODS[method][key] = Reflect.getOwnMetadata(METHODS[method][key], target);
      });
    });
    const controller = {
      target,
      methods: _METHODS
    };
    Reflect.defineMetadata(GLOBALS.SHARED_CONTROLLER, controller, target);
  };
}

export function Handler(): any {
  return function(target: FunctionConstructor) {
    decorate(injectable(), target);
    Reflect.defineMetadata(GLOBALS.SHARED_HANDLER, target, target);
  };
}

export function Get(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.GET[option] = Symbol.for(`${option}Get`);
      Reflect.defineMetadata(METHODS.GET[option], key, target.constructor);
    } else {
      METHODS.GET['default'] = Symbol.for(`defaultGet`);
      Reflect.defineMetadata(METHODS.GET['default'], key, target.constructor);
    }
  };
}

export function Put(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.PUT[option] = Symbol.for(`${option}Put`);
      Reflect.defineMetadata(METHODS.PUT[option], key, target.constructor);
    } else {
      METHODS.PUT['default'] = Symbol.for('defaultPut');
      Reflect.defineMetadata(METHODS.PUT['default'], key, target.constructor);
    }
  };
}

export function Post(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.POST[option] = Symbol.for(`${option}Post`);
      Reflect.defineMetadata(METHODS.POST[option], key, target.constructor);
    } else {
      METHODS.POST['default'] = Symbol.for('defaultPost');
      Reflect.defineMetadata(METHODS.POST['default'], key, target.constructor);
    }
  };
}

export function Delete(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.DELETE[option] = Symbol.for(`${option}Delete`);
      Reflect.defineMetadata(METHODS.DELETE[option], key, target.constructor);
    } else {
      METHODS.DELETE['default'] = Symbol.for('defaultDelete');
      Reflect.defineMetadata(METHODS.DELETE['default'], key, target.constructor);
    }
  };
}

export function Patch(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.PATCH[option] = Symbol.for(`${option}Patch`);
      Reflect.defineMetadata(METHODS.PATCH[option], key, target.constructor);
    } else {
      METHODS.PATCH['default'] = Symbol.for('defaultPatch');
      Reflect.defineMetadata(METHODS.PATCH['default'], key, target.constructor);
    }
  };
}

export function Options(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.OPTIONS[option] = Symbol.for(`${option}Options`);
      Reflect.defineMetadata(METHODS.OPTIONS[option], key, target.constructor);
    } else {
      METHODS.OPTIONS['default'] = Symbol.for('default');
      Reflect.defineMetadata(METHODS.OPTIONS['defaultOptions'], key, target.constructor);
    }
  };
}

export function Head(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      METHODS.HEAD[option] = Symbol.for(`${option}Head`);
      Reflect.defineMetadata(METHODS.HEAD[option], key, target.constructor);
    } else {
      METHODS.HEAD['default'] = Symbol.for('defaultHead');
      Reflect.defineMetadata(METHODS.HEAD['default'], key, target.constructor);
    }
  };
}
