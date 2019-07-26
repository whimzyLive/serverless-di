import { injectable } from 'inversify';

@injectable()
export class Logger {
  log(message: string, data?: any) {
    console.log({
      message,
      createdAt: new Date().toLocaleString(),
      data: typeof data === 'string' ? data : JSON.stringify(data)
    });
  }
  error(message: string, error?: any) {
    console.error({
      message,
      createdAt: new Date().toLocaleString(),
      link: `https://console.aws.amazon.com/cloudwatch/home?region=${
        process.env.AWS_REGION
      }#logEventViewer:group=${process.env.AWS_LAMBDA_LOG_GROUP_NAME};stream=${
        process.env.AWS_LAMBDA_LOG_STREAM_NAME
      }`,
      error: typeof error === 'string' ? error : JSON.stringify(error)
    });
  }
}
