import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';

export async function main(event) {
  const subscriptionId = event.pathParameters.subscriptionId;
  const stripe = stripePackage(process.env.stripeSecretKey);

  try {
    await stripe.subscriptions.del(subscriptionId);
    return success({ message: 'Subscription is cancelled successfully' });
  } catch (e) {
    return failure(e.message);
  }
}
