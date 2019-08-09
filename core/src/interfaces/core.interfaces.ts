import { ICommon } from './common.interfaces';
export namespace ICore {
  /**
   * Used to enforce consumer of @Handler decorators to have declaration of `run` method
   * `event` parameter in run method contains the formatted event comming from aws source
   */
  export interface Handler {
    run(event: any): Promise<any>;
  }

  /**
   * Logger Utitlity interface
   * log and error METHODS take care of logging event in a consistant manner
   */
  export interface Logger {
    log(message: string, data?: any): void;
    error(message: string, error?: any): void;
  }
  /**
   * Raw aws event
   */
  export interface AWS_EVENT {}

  export interface Table {
    init(
      name: string,
      region: string,
      primaryKeys: ICommon.PrimaryKeys,
      options?: ICommon.TableOptions
    ): void;
    putAll(
      payload: Array<any>,
      options?: {
        strict?: boolean;
        returnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
        returnItemCollectionMetrics?: 'SIZE' | 'NONE';
        returnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
      }
    ): Promise<any>;
  }
}
