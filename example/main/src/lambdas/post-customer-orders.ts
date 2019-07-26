import { Controller, Post } from '@serverless-di/core';

@Controller()
export class PostCustomerOrders {
  @Post()
  async postCustomerOrders(event) {}

  @Post('id')
  async postCustomerOrdersById(event) {}
}
