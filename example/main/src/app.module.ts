import { Module } from '@serverless-di/core';
import { PostCustomerOrders } from './lambdas/post-customer-orders';

@Module({
  declarations: [PostCustomerOrders],
  datasources: {
    dynamoDB: [
      {
        name: 'dev-example-orders',
        primaryKeys: { partitionKey: { name: 'id' }, sortKey: { name: 'date' } }
      }
    ]
  },
  config: { region: 'ap-southeast-2' }
})
export class AppModule {}
