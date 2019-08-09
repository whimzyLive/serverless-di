import * as AWS from 'aws-sdk';
import { ICommon } from '../interfaces';

export function getMethodToExecute(path: string, params: any) {
  const pathArray = path.split('/');
  const pathTail = pathArray[pathArray.length - 1];
  if (!params) {
    return 'default';
  } else {
    const paramIndex = Object.values(params).indexOf(pathTail);
    if (paramIndex === -1) {
      return 'default';
    } else {
      return Object.keys(params)[paramIndex];
    }
  }
}

export function setAwsConfig(conf: ICommon.Config) {
  AWS.config.credentials = conf.credentials;
  AWS.config.region = conf.region;
  AWS.config.apiVersion = conf.apiVersion;
  AWS.config.apiVersions = conf.apiVersions;
}
