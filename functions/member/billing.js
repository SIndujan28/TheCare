import stripePackage from 'stripe';
import * as dynamoDbLib from '../../libs/dynamodb-lib';
import { success, failure } from '../../libs/response-lib';

export async function main(event) {
  const { source } = JSON.parse(event.body);
  const email = 'temp@gmail.com';
  const stripe = stripePackage(process.env.stripeSecretKey);
  try {
    const customer = await stripe.customers.create({
      payment_method: source,
      email,
      invoice_settings: {
        default_payment_method: source,
      },
    });
    console.log(`${customer}`);
    const params = {
      TableName: process.env.memberTableName,
      Key: {
        memberId: event.requestContext.identity.cognitoIdentityId,
      },
      UpdateExpression: 'SET #s = :i ',
      ExpressionAttributeNames: { '#s': 'stripe_id' },
      ExpressionAttributeValues: {
        ':i': customer.id,
      },
      ReturnValues: 'ALL_NEW',
    };
    const response = await dynamoDbLib.call('update', params);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: 'plan_GnEEzMCb2QTsSU' }],
      expand: ['latest_invoice.payment_intent'],
    });
    return success(subscription);
  } catch (e) {
    return failure({ message: e.message });
  }
}
