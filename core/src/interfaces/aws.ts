import { ICommon } from './common';

export namespace IAWS {
  /**
   * Token Authorizer
   */
  export interface TokenAuthorizer {
    type: string;
    authorizationToken: string;
    methodArn: string;
  }

  /**
   * Cognito Post confirmation trigger event payload
   */
  export interface PostConfirmationTrigger {
    version: string;
    region: string;
    userPoolId: string;
    userName: string;
    callerContext: {
      awsSdkVersion: string;
      clientId: string;
    };
    triggerSource: string;
    request: {
      userAttributes: {
        sub: string;
        address: string;
        'cognito:email_alias': string;
        'cognito:user_status': string;
        email_verified: string;
        phone_number_verified: string;
        phone_number: string;
        given_name: string;
        family_name: string;
        email: string;
        [key: string]: string;
      };
    };
    response: {};
  }

  export interface Table {
    init(
      name: string,
      region: string,
      primaryKeys: ICommon.PrimaryKeys,
      options?: ICommon.TableOptions
    ): void;
    putAll(
      payload: Array<any>,
      options?: {
        strict?: boolean;
        returnConsumedCapacity?: 'INDEXES' | 'TOTAL' | 'NONE';
        returnItemCollectionMetrics?: 'SIZE' | 'NONE';
        returnValues?: 'NONE' | 'ALL_OLD' | 'UPDATED_OLD' | 'ALL_NEW' | 'UPDATED_NEW';
      }
    ): Promise<any>;
  }

  /**
   * Raw aws event
   */
  export interface AWS_EVENT {}
}
