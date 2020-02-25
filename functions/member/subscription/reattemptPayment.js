import * as dynamoDbLib from '../../../libs/dynamodb-lib';
import { success, failure } from '../../../libs/response-lib';
import reattemptPayment from '../../../libs/reattempt-payment-lib';

export async function main(event) {
  const { paymentMethod, invoiceId } = JSON.parse(event.body);
  const params = {
    TableName: process.env.memberTableName,
    Key: {
      memberId: event.requestContext.identity.cognitoIdentityId,
    },
  };
  try {
    const response = await dynamoDbLib.call('get', params);
    if (!response.Item.stripe_id) {
      return failure({ status: false, error: 'Member is not a stripe customer,call billing API to become a customer' });
    }
    const customerId = response.Item.stripe_id;
    const invoiceResponse = await reattemptPayment(paymentMethod, customerId, invoiceId);
    return success(invoiceResponse);
  } catch (e) {
    return failure(e.message);
  }
}
