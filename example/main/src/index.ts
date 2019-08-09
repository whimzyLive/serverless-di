import { AppModule } from './app.module';
import { ServerlessFactory } from '@serverless-di/core';
const app = new ServerlessFactory();
app.create(AppModule);
module.exports = app.start();
