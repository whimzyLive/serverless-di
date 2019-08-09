import { Controller, Post, inject, AWS, named, ICore } from '@serverless-di/core';

@Controller()
export class PostCustomerOrders {
  constructor(@inject(AWS.Table) @named('dev-example-orders') public ordersTable: ICore.Table) {}
  @Post()
  async postCustomerOrders(event: any) {
    console.log(`Started PostCustomerOrders Function with event ${event}`);
    const items = [
      { id: '1', date: '2019-08-02', data: { some: 'data' } },
      { date: '2019-08-03', data: { some2: 'data2' } },
      { id: '3', date: '2019-08-04', data: { some3: 'data3' } },
      { id: '4', data: { some4: 'data4' } }
    ];
    const reesult = await this.ordersTable.putAll(items);
    console.log(reesult);
    return reesult;
  }
}
