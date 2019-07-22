import { injectable } from 'inversify';

@injectable()
export class DynamoDB {
  table: string;
  region: string;
  constructor(table: string, region: string) {
    this.table = table;
    this.region = region;
  }

  /**
   * initialize db service with table name and region to perform query against
   * @param table - table name
   * @param region - region  that table resides in
   * @optional - this `MUST` be called before any other operation, if not using @nammed() binding
   */
  init(table: string, region: string) {
    this.table = table;
    this.region = region;
  }
}
