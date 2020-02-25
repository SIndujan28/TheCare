import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';
import * as dynamoDbLib from '../../../libs/dynamodb-lib';

export async function main(event) {
  const stripe = stripePackage(process.env.stripeSecretKey);
  try {
    const params = {
      TableName: process.env.memberTableName,
      Key: {
        memberId: event.requestContext.identity.cognitoIdentityId,
      },
    };
    const user = await dynamoDbLib.call('get', params);
    const customerId = user.Item.stripe.customer_id;
    const list = await stripe.subscriptions.list({ customer: customerId });
    return success(list);
  } catch (e) {
    return failure(e.message);
  }
}
