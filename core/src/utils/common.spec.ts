import { getMethodToExecute } from './common';

describe('GetMethodsToExecute', () => {
  it('should return "default" when no params is available', () => {
    const result = getMethodToExecute('/orders', undefined);
    expect(result).toBe('default');
  });

  it('should return appropriate method, when there are one or more paramter exists', () => {
    const result = getMethodToExecute('111/orders/someid', {
      id: 'someid',
      organisationId: '111'
    });
    expect(result).toBe('id');
  });

  it('should return default method, if there are params available but path does not end with one', () => {
    const result = getMethodToExecute('111/orders', {
      organisationId: '111'
    });
    expect(result).toBe('default');
  });
});
