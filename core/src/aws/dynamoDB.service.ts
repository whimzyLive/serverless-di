import { injectable } from 'inversify';

@injectable()
export class DynamoDB {
  table: string;
  region: string;
  constructor(table: string, region: string) {
    this.table = table;
    this.region = region;
  }
}
