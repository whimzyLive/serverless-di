import { Utils, AWS } from '@serverless-di/common';
import { ContainerModule, Container } from 'inversify';
import { Logger } from '../utils/logger.service';
import { DynamoDB } from '../aws/dynamoDB';
const commonModule = new ContainerModule(bind => {
  bind(Utils.Logger).to(Logger);
});
const awsModule = new ContainerModule(bind => {
  bind(AWS.DynamoDB).to(DynamoDB);
});

const innerContainer = new Container();
innerContainer.load(commonModule);

export const container = innerContainer;
