import { Module } from '@serverless-di/core';
import { PostCustomerOrders } from './lambdas/post-customer-orders';

@Module({
  declarations: [PostCustomerOrders]
})
export class AppModule {}
