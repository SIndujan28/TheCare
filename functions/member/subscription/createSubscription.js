import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';
import * as dynamoDbLib from '../../../libs/dynamodb-lib';

export async function main(event) {
  const stripe = stripePackage(process.env.stripeSecretKey);
  const { paymentMethod, email, planId } = JSON.parse(event.body);
  try {
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
    const params = {
      TableName: process.env.memberTableName,
      Key: {
        memberId: event.requestContext.identity.cognitoIdentityId,
      },
      UpdateExpression: 'SET #s.#c = :i',
      ExpressionAttributeNames: { '#s': 'stripe', '#c': 'customer_id' },
      ExpressionAttributeValues: {
        ':i': customer.id,
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDbLib.call('update', params);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan: planId,
        },
      ],
      expand: ['latest_invoice.payment_intent'],
    });

    return success(subscription.id);
  } catch (e) {
    return failure(e.message);
  }
}
