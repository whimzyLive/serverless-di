export namespace ICommon {
  /**
   * Modules are used to make different services, classes available within a singal container
   * @param declarations- used for registering any handlers
   * @param providers- used for registering services that interact with http
   * @param utils- used for any other class that needs to work with di
   */
  export interface Module {
    declarations: any[];
    providers?: any[];
  }

  export interface Handler {
    run(event: any): Promise<any>;
  }

  export interface Logger {
    log(message: string, data?: any): void;
    error(message: string, error?: any): void;
  }

  export interface AWS_EVENT {}
}
