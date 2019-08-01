import { Controller, Post, inject, AWS, named, ICommon } from '@serverless-di/core';

@Controller()
export class PostCustomerOrders {
  constructor(
    @inject(AWS.Table) @named('dev-example-orders') public ordersTable: () => ICommon.Table
  ) {}
  @Post()
  async postCustomerOrders(event: any) {
    const { body } = event;
  }

  @Post('id')
  async postCustomerOrdersById(event) {}
}
