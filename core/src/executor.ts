import { ICommon } from '@serverless-di/common';
import { getMethodToExecute } from './utils';

export const executeAuthoriserFunction = async (
  handler: ICommon.Handler,
  ctx: any,
  payload: any
) => {
  try {
    return await handler.run(payload);
  } catch (err) {
    console.log(`Failed to execute authorizer function. errored with: ${JSON.stringify(err)}`);
    throw err;
  }
};

export const executeApiGatewayProxyFunction = async (controller: any, ctx: any, event) => {
  const target = controller.target;
  const methods = controller.methods;
  // here controller value {target: self, get: {default: <function name>, "<option>": <function name>}, ...other methods}
  const incomingMethod = event.httpMethod;
  const params = event.pathParameters;

  let response: any;
  try {
    const methodTOExecute = getMethodToExecute(event.path, params);
    const methodFunctionName = methods[incomingMethod][methodTOExecute];

    if (methodFunctionName) {
      try {
        // Hardcode return response to be 200 for now, until there is a support for @Response decorator
        // return { statusCode: 200, body: response };
        response = await target[methodFunctionName](event);
        if (response && typeof response !== 'string') {
          response = JSON.stringify(response);
        }
        return { statusCode: 200, body: response };
      } catch (err) {
        // Hardcode return response to be 401 for now, until there is a support for @Response decorator
        return { statusCode: 401, body: err };
      }
    } else {
      if (methodTOExecute === 'default') {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `Requested method <${incomingMethod}> does not exist on "${
              target.constructor.name
            }" controller.`,
          }),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: `Requested method <${incomingMethod}/${methodTOExecute}> does not exist on <${
              target.constructor.name
            }> controller.`,
          }),
        };
      }
    }
  } catch (err) {
    console.log(
      `Could not execure requested method <${incomingMethod}> on <${target.constructor.name}>.`
    );
    throw new Error(err);
  }
};

export const executeCustomFunction = async (handler: ICommon.Handler, ctx: any, payload: any) => {
  try {
    return await handler.run(payload);
  } catch (err) {
    console.log(`Failed to execute Custom function. errored with: ${JSON.stringify(err)}`);
    throw err;
  }
};
