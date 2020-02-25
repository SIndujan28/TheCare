import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';
import * as dynamoDbLib from '../../../libs/dynamodb-lib';

export async function main(event) {
  const stripe = stripePackage(process.env.stripeSecretKey);
  const { paymentMethod, email, planId } = JSON.parse(event.body);
  try {
    const params1 = {
      TableName: process.env.memberTableName,
      Key: {
        memberId: event.requestContext.identity.cognitoIdentityId,
      },
    };
    const response = await dynamoDbLib.call('get', params1);
    if (response.Item.subscriptions.includes(planId)) {
      return failure({ message: 'User already subscribed to the plan' });
    }
    if (!response.Item.stripe.customer_id) {
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: planId,
          },
        ],
        expand: ['latest_invoice.payment_intent'],
      });
      const params = {
        TableName: process.env.memberTableName,
        Key: {
          memberId: event.requestContext.identity.cognitoIdentityId,
        },
        UpdateExpression: 'SET #s.#c = :i,#sub = list_append(#sub,:p)',
        ExpressionAttributeNames: { '#s': 'stripe', '#c': 'customer_id', '#sub': 'subscriptions' },
        ExpressionAttributeValues: {
          ':i': customer.id,
          ':p': planId,
        },
        ReturnValues: 'ALL_NEW',
      };
      await dynamoDbLib.call('update', params);
      return success(subscription.id);
    }
  } catch (e) {
    return failure(e.message);
  }
}
