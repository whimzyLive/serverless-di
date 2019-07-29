import { injectable } from 'inversify';

@injectable()
export class Table {
  name: string;
  region: string;
  constructor() {}
}
