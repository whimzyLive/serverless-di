import { ICommon } from '@serverless-di/core';
export function isValidDynamoItem(primaryKeys: ICommon.PrimaryKeys, item: Object) {
  const { partitionKey, sortKey } = primaryKeys;
  if (typeof item === 'object' && item !== null) {
    // If item has partitionkey property and is not falsy
    if (partitionKey && partitionKey.name && sortKey && sortKey.name) {
      // Composite Primary key
      if (item[partitionKey.name] && item[sortKey.name]) {
        return true;
      }
    } else if (partitionKey && partitionKey.name && !sortKey) {
      // Simple Primary key
      if (item[partitionKey.name]) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}
