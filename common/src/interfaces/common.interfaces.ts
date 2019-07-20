export namespace ICommon {
  /**
   * Modules are used to make different services, classes available within a singal container
   * @param declarations- used for registering any handlers
   * @param providers- used for registering services that interact with http
   * @param datasources- used to define list of data sources to be available for injecting
   * @param environment- used to declare list of environment variables
   */
  export interface Module {
    declarations: Array<any>;
    providers?: Array<any>;
    datasources?: { dynamoDB?: Array<Table> }; // Currently only supports dynamoDB,
    environment?: Array<string>;
  }

  export interface Table {
    name: string;
    region?: string;
  }

  /**
   * Used to enforce consumer of @Handler decorators to have declaration of `run` method
   * `event` parameter in run method contains the formatted event comming from aws source
   */
  export interface Handler {
    run(event: any): Promise<any>;
  }

  /**
   * Logger Utitlity interface
   * log and error methods take care of logging event in a consistant manner
   */
  export interface Logger {
    log(message: string, data?: any): void;
    error(message: string, error?: any): void;
  }

  /**
   * Raw aws event
   */
  export interface AWS_EVENT {}
}
