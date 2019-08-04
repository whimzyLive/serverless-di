import { ICommon } from '@serverless-di/core';
import { isValidDynamoItem, createDynamoItem } from '../utils/aws';
import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import { strict } from 'assert';

@injectable()
export class Table {
  name: string;
  region: string;
  partitionKey: ICommon.PartitionKey;
  sortKey: ICommon.SortKey;
  options: ICommon.TableOptions = <any>{}; // By default strict is turned off
  constructor() {}

  init(
    name: string,
    region: string,
    partitionKey: ICommon.PartitionKey,
    sortKey: ICommon.SortKey,
    options?: ICommon.TableOptions
  ) {
    this.name = name;
    this.region = region;
    this.partitionKey = partitionKey;
    this.sortKey = sortKey;
    this.options.strict = false;
  }
  /**
   *
   * @param partitionKeyName Table Partition Key `name`
   * @param payload Data to put against given partitionKey
   * @param options Configuration Options
   */
  async putAll(payload: Array<any>, options: { strict?: boolean }) {
    // if no strict provided use default value for strict
    if (!options.strict) {
      options.strict = this.options.strict;
    }
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const items = { valid: [], invalid: [] };

    payload.reduce((acc, curr) => {
      // Verify item, if valid item return otherwise
      if (isValidDynamoItem(this.partitionKey.name, curr)) {
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

    return documentClient.batchWrite(params).promise();
  }
}
