import { SDK } from './../constants/tokens';
import { isValidDynamoItem, createDynamoItem } from '../utils/aws';
import { injectable, inject } from 'inversify';

@injectable()
export class Table {
  name: string;
  region: string;
  constructor(@inject(SDK.DocumentClient) public documentClient: AWS.DynamoDB.DocumentClient) {}
  async putAll(partitionKeyName: string, payload: Array<any>, options: { strict: false }) {
    const items = { valid: [], invalid: [] };

    payload.reduce((acc, curr) => {
      // Verify item, if valid item return otherwise
      if (isValidDynamoItem(partitionKeyName, curr)) {
        acc.valid.push(curr);
      } else {
        acc.invalid.push(curr);
      }
      return acc;
    }, items);

    if (items.invalid.length && options.strict) {
      throw new Error('Could not process items, one or more item is invalid');
    }

    const putRequests = items.valid.reduce((accu, curr) => {
      const requestItem = {
        PutRequest: {
          Item: createDynamoItem(curr)
        }
      };
      accu.push(requestItem);
      return accu;
    }, []);

    const params = {
      RequestItems: {
        [this.name]: putRequests
      }
    };

    return this.documentClient.batchWrite(params).promise();
  }
}
