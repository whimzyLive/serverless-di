import 'reflect-metadata';
import { ICommon } from './interfaces';
import { Globals, Methods } from './constants';
import { decorate, injectable } from 'inversify';
import { registerBindings } from './utils';

export function Module(object: ICommon.Module): any {
  return function(target: FunctionConstructor) {
    target.prototype['bindings'] = registerBindings(object);
  };
}

export function Controller(): any {
  return function(target: FunctionConstructor) {
    decorate(injectable(), target);
    const _methods = {
      GET: <any>{},
      PUT: <any>{},
      POST: <any>{},
      DELETE: <any>{},
      PATCH: <any>{},
      OPTIONS: <any>{},
      HEAD: <any>{},
    };
    // Get the metadata of each method and map it methods object
    Reflect.ownKeys(Methods).forEach(method => {
      Reflect.ownKeys(Methods[method]).forEach(key => {
        _methods[method][key] = Reflect.getOwnMetadata(Methods[method][key], target);
      });
    });
    const controller = {
      target,
      methods: _methods,
    };
    Reflect.defineMetadata(Globals.SharedController, controller, target);
  };
}

export function Handler(): any {
  return function(target: FunctionConstructor) {
    decorate(injectable(), target);
    Reflect.defineMetadata(Globals.SharedHandler, target, target);
  };
}

export function Get(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.GET[option] = Symbol.for(`${option}Get`);
      Reflect.defineMetadata(Methods.GET[option], key, target.constructor);
    } else {
      Methods.GET['default'] = Symbol.for(`defaultGet`);
      Reflect.defineMetadata(Methods.GET['default'], key, target.constructor);
    }
  };
}

export function Put(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.PUT[option] = Symbol.for(`${option}Put`);
      Reflect.defineMetadata(Methods.PUT[option], key, target.constructor);
    } else {
      Methods.PUT['default'] = Symbol.for('defaultPut');
      Reflect.defineMetadata(Methods.PUT['default'], key, target.constructor);
    }
  };
}

export function Post(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.POST[option] = Symbol.for(`${option}Post`);
      Reflect.defineMetadata(Methods.POST[option], key, target.constructor);
    } else {
      Methods.POST['default'] = Symbol.for('defaultPost');
      Reflect.defineMetadata(Methods.POST['default'], key, target.constructor);
    }
  };
}

export function Delete(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.DELETE[option] = Symbol.for(`${option}Delete`);
      Reflect.defineMetadata(Methods.DELETE[option], key, target.constructor);
    } else {
      Methods.DELETE['default'] = Symbol.for('defaultDelete');
      Reflect.defineMetadata(Methods.DELETE['default'], key, target.constructor);
    }
  };
}

export function Patch(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.PATCH[option] = Symbol.for(`${option}Patch`);
      Reflect.defineMetadata(Methods.PATCH[option], key, target.constructor);
    } else {
      Methods.PATCH['default'] = Symbol.for('defaultPatch');
      Reflect.defineMetadata(Methods.PATCH['default'], key, target.constructor);
    }
  };
}

export function Options(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.OPTIONS[option] = Symbol.for(`${option}Options`);
      Reflect.defineMetadata(Methods.OPTIONS[option], key, target.constructor);
    } else {
      Methods.OPTIONS['default'] = Symbol.for('default');
      Reflect.defineMetadata(Methods.OPTIONS['defaultOptions'], key, target.constructor);
    }
  };
}

export function Head(option?: string): any {
  return function(target: any, key: string, descriptor: PropertyDecorator) {
    if (option) {
      Methods.HEAD[option] = Symbol.for(`${option}Head`);
      Reflect.defineMetadata(Methods.HEAD[option], key, target.constructor);
    } else {
      Methods.HEAD['default'] = Symbol.for('defaultHead');
      Reflect.defineMetadata(Methods.HEAD['default'], key, target.constructor);
    }
  };
}
