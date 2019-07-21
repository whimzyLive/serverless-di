// Keys used to retrive and global objects
export const Globals = {
  SharedHandler: Symbol.for('SharedHandler'),
  SharedController: Symbol.for('SharedController'),
  Aws_ctx: Symbol.for('AwsContext'),
  Aws_event: Symbol.for('AwsEvent')
};
export const Handlers = <any>{}; // Will be Dynamically binded by decorators
export const Controllers = <any>{}; // Will be Dynamically binded by decorators //{target:self, methods: {}}
export const Methods = {
  GET: <any>{},
  PUT: <any>{},
  POST: <any>{},
  DELETE: <any>{},
  PATCH: <any>{},
  OPTIONS: <any>{},
  HEAD: <any>{}
};
export const Env = <any>{};

export const Utils = {
  Logger: Symbol.for('Logger')
};
export const AWS = {
  DynamoDB: Symbol.for('DynamoDB')
};

export * from './event-sources';
