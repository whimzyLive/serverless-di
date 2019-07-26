import { ContainerModule, Container } from 'inversify';
import { Logger } from '../common/logger.service';
import { DynamoDB } from '../aws/dynamoDB.service';
import { UTILS, AWS } from '../constants';
const commonModule = new ContainerModule(bind => {
  bind(UTILS.Logger).to(Logger);
});

const awsModule = new ContainerModule(bind => {
  bind(AWS.DynamoDB)
    .to(DynamoDB)
    .inSingletonScope();
});

const innerContainer = new Container();
innerContainer.load(commonModule, awsModule);

export const container = innerContainer;
