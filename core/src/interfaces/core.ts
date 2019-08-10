import { ICommon } from './common';
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
}
