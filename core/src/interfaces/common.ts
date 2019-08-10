import { APIVersions } from 'aws-sdk/lib/config';

export namespace ICommon {
  /**
   * Modules are used to make different services, classes available within a singal container
   * @param declarations- used for registering any HANDLERS
   * @param providers- used for registering services that interact with http
   * @param datasources- used to define list of data sources to be available for injecting
   * @param config- used to set aws credentials on aws sdk
   */
  export interface Module {
    declarations: Array<any>;
    providers?: Array<any>;
    datasources?: Datasources; // Currently only supports dynamoDB,
    config: Config;
  }

  export interface Datasources {
    dynamoDB: Array<Table>;
  }

  export interface Table {
    name: string;
    region?: string;
    primaryKeys: PrimaryKeys;
    options?: TableOptions;
  }

  export interface PrimaryKeys {
    partitionKey: ICommon.PartitionKey;
    sortKey?: ICommon.SortKey;
  }

  export interface PartitionKey {
    name: string;
  }

  export interface SortKey {
    name: string;
    required?: boolean;
    default?: string;
  }

  export interface TableOptions {
    strict?: boolean;
    returnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
    returnItemCollectionMetrics?: 'SIZE' | 'NONE';
    returnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
  }

  export interface Config extends APIVersions {
    credentials?: { accessKeyId: string; secretAccessKey: string }; // Required if you wish to use services that needs to interact with aws sdk
    region: string;
  }

  export interface Condition {
    where: {};
  }
}
