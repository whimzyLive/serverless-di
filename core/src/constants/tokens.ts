// Keys used to retrive and global objects
export const GLOBALS = {
  SHARED_HANDLER: Symbol.for('SHARED_HANDLER'),
  SHARED_CONTROLLER: Symbol.for('SHARED_CONTROLLER'),
  AWS_CTX: Symbol.for('AWS_CTX'),
  AWS_EVENT: Symbol.for('AWS_EVENT')
};
export const HANDLERS = <any>{}; // Will be Dynamically binded by decorators
export const CONTROLLERS = <any>{}; // Will be Dynamically binded by decorators //{target:self, METHODS: {}}
export const METHODS = {
  GET: <any>{},
  PUT: <any>{},
  POST: <any>{},
  DELETE: <any>{},
  PATCH: <any>{},
  OPTIONS: <any>{},
  HEAD: <any>{}
};
export const ENV = <any>{};

export const UTILS = {
  Logger: Symbol.for('Logger')
};
export const AWS = {
  DynamoDB: Symbol.for('DynamoDB')
};
