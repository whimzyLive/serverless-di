import * as AWS from 'aws-sdk';
export namespace IAws {
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
}
