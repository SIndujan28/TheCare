import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';

export async function main(event) {
  const stripe = stripePackage(process.env.stripeSecretKey);
  const subscriptionId = event.pathParameters.subscriptionId;
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return success(subscription);
  } catch (e) {
    return failure(e.message);
  }
}
