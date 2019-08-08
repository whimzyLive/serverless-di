import { EventSource } from './constants';
import { exhumeApiGatewayAuthorizer, exhumerApiGatewayProxy } from './exhumer';
import { detectEventType } from './event-detector';
import {
  executeAuthoriserFunction,
  executeCustomFunction,
  executeApiGatewayProxyFunction
} from './executor';
import { ICore } from './interfaces';
import { HANDLERS, CONTROLLERS } from './constants';

export const bootstrapHandler = async function(event: any, ctx: any, { container, key }) {
  const eventType = detectEventType(event);
  const handler: ICore.Handler = container.get(HANDLERS[key]);

  switch (eventType) {
    case EventSource.ApiGatewayAuthorizer: {
      const payload = exhumeApiGatewayAuthorizer(event);
      const res = await executeAuthoriserFunction(handler, ctx, payload);
      console.log(typeof res === 'object' ? JSON.stringify(res) : res);
      return res;
    }
    default: {
      console.log('Falling back to Default');
      const res = await executeCustomFunction(handler, ctx, event);
      console.log(typeof res === 'object' ? JSON.stringify(res) : res);
      return res;
    }
  }
};

export const bootstrapController = async (event: any, ctx: any, { container, key }) => {
  const eventType = detectEventType(event);
  const controller = {
    target: container.get(CONTROLLERS[key]['target']),
    methods: container.get(CONTROLLERS[key]['methods'])
  };
  console.log(`eventType: ${eventType}`);

  switch (eventType) {
    case EventSource.ApiGatewayAwsProxy: {
      const formattedEvent = exhumerApiGatewayProxy(event);
      const res = await executeApiGatewayProxyFunction(controller, ctx, formattedEvent);
      console.log(JSON.stringify(res));
      return res;
    }
    default: {
      throw new Error('Reuqested Method does not exist');
    }
  }
};
