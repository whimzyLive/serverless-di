import * as base64 from 'base-64';
import * as utf8 from 'utf8';

export const exhumeApiGatewayAuthorizer = event => event;
export const exhumerApiGatewayProxy = event => {
  try {
    let body = {};
    if (event.isBase64Encoded) {
      // decode body if base64
      const base64Decoded = base64.decode(event.body);
      const utf8Decoded = utf8.decode(base64Decoded);

      body = utf8Decoded && typeof utf8Decoded === 'string' ? JSON.parse(utf8Decoded) : utf8Decoded;
    } else {
      body = event.body && typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    }
    // return new object with body transformatted to plain json
    return {
      ...event,
      body,
    };
  } catch (err) {
    console.log(`Unable to exhume event!: ${JSON.stringify(err) || err}`);
  }
};
