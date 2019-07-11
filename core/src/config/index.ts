import { Utils } from '@serverless-di/common';
import { ContainerModule, Container } from 'inversify';
import { Logger } from '../utils/logger.service';
const commonModule = new ContainerModule(bind => {
  bind(Utils.Logger).to(Logger);
});

const innerContainer = new Container();
innerContainer.load(commonModule);

export const container = innerContainer;
