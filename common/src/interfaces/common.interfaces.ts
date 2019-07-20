export namespace ICommon {
  /**
   * Modules are used to make different services, classes available within a singal container
   * @param declarations- used for registering any handlers
   * @param providers- used for registering services that interact with http
   * @param datasources- user to define list of data sources to be available for injecting
   */
  export interface Module {
    declarations: any[];
    providers?: any[];
    datasources?: { dynamoDB?: [] }; // Currently only supports dynamoDB
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
