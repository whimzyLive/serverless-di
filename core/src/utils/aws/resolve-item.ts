export function createDynamoItem(curr: any) {
  // create dynamo item and return
  return {};
}

function format(item) {
  // format item
}

function _detectType(item: any) {
  if (typeof item === 'string') {
    return _resolveType('string');
  } else if (typeof item === 'number') {
    return _resolveType('number');
  } else if (typeof item === 'boolean') {
    return _resolveType('boolean');
  } else if (item instanceof Buffer) {
    return _resolveType('buffer');
  } else if (item instanceof Array) {
    return _resolveType('array', item);
  } else if (item instanceof Object) {
    return _resolveType('object');
  } else if (item === null) {
    return _resolveType('null');
  }
}

function _resolveType(type: string, val?: any) {
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
        const type = _detectType(val);
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
