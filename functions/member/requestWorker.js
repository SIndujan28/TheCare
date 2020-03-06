import AWS from 'aws-sdk';
import { success, failure } from '../../libs/response-lib';

const SQS = new AWS.SQS({ region: 'ap-southeast-1' });
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const QUEUE_URL = `https://sqs.ap-southeast-1.amazonaws.com/${ACCOUNT_ID}/MyQueue`;

export async function main(event) {
  const data = JSON.parse(event.body);
  const msgBody = {
    memberId: event.requestContext.identity.cognitoIdentityId,
    subscription_id: data.subscription_id,
    subscription_plan: data.subscription_plan,
    worker_type: data.worker_type,
  };
  const params = {
    MessageBody: JSON.stringify(msgBody),
    QueueUrl: QUEUE_URL,
  };
  try {
    const response = await SQS.sendMessage(params).promise();
    return success(response.MessageId);
  } catch (e) {
    console.log(e);
    return failure(e);
  }
}
