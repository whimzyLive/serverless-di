import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { bootstrapController, bootstrapHandler } from './bootstrapper';
import { container } from './config';
import { HANDLERS, GLOBALS, CONTROLLERS } from './constants';
export class ServerlessFactory {
  private _container: Container;
  constructor() {
    this._container = container;
  }

  create(appModule: any): Container {
    console.log('Creating app');

    // load the binding into container
    Reflect.ownKeys(appModule.prototype.bindings).forEach((binding: any) => {
      this._container.load(appModule.prototype.bindings[binding]);
    });
    return this._container;
  }

  start(container: Container = this._container) {
    const app = {};

    try {
      // export HANDLERS
      Reflect.ownKeys(HANDLERS).forEach(key => {
        app[this.resolveSymbol(HANDLERS[key])] = async (event, context) => {
          // Create new ContainerModule of event and ctx and load it into container
          const ctxModule = new ContainerModule(bind => {
            bind(GLOBALS.AWS_CTX).toConstantValue(context);
            bind(GLOBALS.AWS_EVENT).toConstantValue(event);
          });
          container.load(ctxModule);

          return bootstrapHandler(event, context, { container, key });
        };
      });

      //export CONTROLLERS
      Reflect.ownKeys(CONTROLLERS).forEach(key => {
        app[this.resolveSymbol(CONTROLLERS[key]['target'])] = async (event, context) => {
          // Create new ContainerModule of event and ctx and load it into container
          console.log(event);
          const ctxModule = new ContainerModule(bind => {
            bind(GLOBALS.AWS_CTX).toConstantValue(context);
            bind(GLOBALS.AWS_EVENT).toConstantValue(event);
          });
          container.load(ctxModule);
          return bootstrapController(event, context, { container, key });
        };
      });
      return app;
    } catch (err) {
      console.log(`Unable to Start the function!: ${JSON.stringify(err) || err}`);
      throw new Error(err);
    }
  }

  private resolveSymbol(symbol: Symbol): string {
    // Symbol in nodejs does not have description poperty and so
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description doesn't work
    const regExp = /\(([^)]+)\)/;
    const names = regExp.exec(symbol.toString()) || symbol.toString();

    return names[1];
  }
}
