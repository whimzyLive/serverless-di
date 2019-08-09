import { createDynamoItem } from './resolve-item';
describe('Resolve items', () => {
  it('Should resolve item to dynamoDB item', () => {
    const item = {
      id: 1,
      date: 'today',
      stringSet: ['item1', 'item2'],
      numberSet: [1, 2, 3],
      bufferSet: [Buffer.from('buffer1'), Buffer.from('buffer2')],
      mixedType: [1, '2', Buffer.from('3')],
      someObject: { one: 'value' }
    };
    const crafterItem = createDynamoItem(item);
    const expected = {
      id: { N: 1 },
      date: { S: 'today' },
      stringSet: { SS: ['item1', 'item2'] },
      numberSet: { NS: [1, 2, 3] },
      bufferSet: { BS: [Buffer.from('buffer1'), Buffer.from('buffer2')] },
      mixedType: { L: [1, '2', Buffer.from('3')] },
      someObject: { M: { one: 'value' } }
    };
    expect(crafterItem).toEqual(expected);
  });
});
