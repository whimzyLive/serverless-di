import { TestBed } from '@serverless-di/testing';
import { PostCustomerOrders } from './post-customer-orders';

describe('PostCustomerOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCustomerOrders],
      config: { region: 'ap-southeast-2' },
      datasources: {
        dynamoDB: [
          {
            name: 'dev-example-orders',
            primaryKeys: { partitionKey: { name: 'id' }, sortKey: { name: 'date' } }
          }
        ]
      }
    });
  });
  afterEach(() => {
    TestBed.reset();
  });
  it('should work', () => {
    const controller = TestBed.getController('PostCustomerOrders');

    expect(controller).toBeTruthy();
  });
});
