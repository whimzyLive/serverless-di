export function createDynamoItem(curr: any) {
  // create dynamo item and return
  return {};
}

function detectType(item: any) {
  if (typeof item === 'string') {
    return resolveType('string');
  } else if (typeof item === 'number') {
    return resolveType('number');
  } else if (typeof item === 'boolean') {
    return resolveType('boolean');
  } else if (item instanceof Buffer) {
    return resolveType('buffer');
  } else if (item instanceof Array) {
    return resolveType('array', item);
  } else if (item instanceof Object) {
    return resolveType('object');
  } else if (item === null) {
    return resolveType('null');
  }
}

function resolveType(type: string, val?: any) {
  switch (type) {
    case 'string': {
      return 'S';
    }
    case 'number': {
      return 'N';
    }
    case 'boolean': {
      return 'BOOL';
    }
    case 'buffer': {
      return 'B';
    }
    case 'object': {
      return 'M';
    }
    case 'null': {
      return 'NULL';
    }
    case 'array': {
      if (val && val.length) {
        const type = detectType(val);
        switch (type) {
          case 'S': {
            return 'SS';
          }
          case 'N': {
            return 'NS';
          }
          case 'B': {
            return 'BS';
          }
          default: {
            return 'L';
          }
        }
      } else {
        return 'L';
      }
    }
  }
}
