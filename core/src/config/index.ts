import { ContainerModule, Container } from 'inversify';
import { Logger } from '../common/logger.service';
import { UTILS, SDK } from '../constants';
import * as AWS_SDK from 'aws-sdk';
const commonModule = new ContainerModule(bind => {
  bind(UTILS.Logger).to(Logger);
});

const sdkModule = new ContainerModule(bind => {
  bind(SDK.DocumentClient)
    .to(AWS_SDK.DynamoDB.DocumentClient)
    .inSingletonScope();
  bind(SDK.DynamoDB)
    .to(AWS_SDK.DynamoDB)
    .inSingletonScope();
});

const innerContainer = new Container();
innerContainer.load(commonModule, sdkModule);

export const container = innerContainer;
