import { ContainerModule, Container } from 'inversify';
import { Logger } from '../common/logger.service';
import { UTILS } from '../constants';
const commonModule = new ContainerModule(bind => {
  bind(UTILS.Logger).to(Logger);
});

const innerContainer = new Container();
innerContainer.load(commonModule);

export const container = innerContainer;
