import { EventSource } from './constants/event-sources';

export function detectEventType(event: any) {
  if (event.Records && event.Records[0].cf) return EventSource.CloudFront;

  if (event.configRuleId && event.configRuleName && event.configRuleArn)
    return EventSource.AwsConfig;

  if (event.Records && event.Records[0].eventSource === 'aws:codecommit')
    return EventSource.CodeCommit;

  if (event.authorizationToken === 'incoming-client-token') return EventSource.ApiGatewayAuthorizer;

  if (event.StackId && event.RequestType && event.ResourceType) return EventSource.CloudFormation;

  if (event.Records && event.Records[0].eventSource === 'aws:ses') return EventSource.Ses;

  if (event.path && event.httpMethod && event.headers) return EventSource.ApiGatewayAwsProxy;

  if (event.source === 'aws.events') return EventSource.ScheduledEvent;

  if (event.awslogs && event.awslogs.data) return EventSource.CloudWatchLogs;

  if (event.Records && event.Records[0].EventSource === 'aws:sns') return EventSource.Sns;

  if (event.Records && event.Records[0].eventSource === 'aws:dynamodb') return EventSource.DynamoDb;

  if (
    (event.records && event.records[0].approximateArrivalTimestamp) ||
    (event.records &&
      event.deliveryStreamArn &&
      event.deliveryStreamArn.startsWith('arn:aws:kinesis:'))
  )
    return EventSource.KinesisFirehose;

  if (event.eventType === 'SyncTrigger' && event.identityId && event.identityPoolId)
    return EventSource.CognitoSyncTrigger;

  if (event.Records && event.Records[0].eventSource === 'aws:kinesis') return EventSource.Kinesis;

  if (event.Records && event.Records[0].eventSource === 'aws:s3') return EventSource.S3;

  if (event.operation && event.message) return EventSource.MobileBackend;

  return EventSource.Custom;
}
