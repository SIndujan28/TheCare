import stripePackage from 'stripe';
import { success, failure } from '../../../libs/response-lib';

export async function main() {
  const stripe = stripePackage(process.env.stripeSecretKey);
  try {
    const plans = await stripe.plans.list();
    return success(plans);
  } catch (e) {
    return failure(e.message);
  }
}
