export function isValidDynamoItem(partitionKeyName: string, item: Object) {
  // verify that item is valid, by it means that given item has primaryKeyName named key
  if (typeof item === 'object' && item !== null) {
    // If item has partitionkey property and is not falsy
    if (item[partitionKeyName]) {
      return true;
    } else return false;
  } else {
    return false;
  }
}
