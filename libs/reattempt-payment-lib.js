import stripePackage from 'stripe';

const stripe = stripePackage(process.env.stripeSecretKey);
async function attachMethod(paymentMethod, customerId) {
  try {
    const response = await stripe.paymentMethods.attach(paymentMethod, { customer: customerId });
    console.log(response);
    return response;
  } catch (e) {
    throw Error(e.message);
  }
}

async function updateMethod(paymentMethod, customerId) {
  try {
    const customer = await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
    return customer;
  } catch (e) {
    throw Error(e.message);
  }
}

export default async function reattemptPayment(paymentMethod, customerId, invoiceId) {
  try {
    const response = await attachMethod(paymentMethod, customerId);
    await updateMethod(response.id, customerId);
    const invoice = await stripe.invoices.pay(invoiceId, {
      expand: ['payment_intent'],
    });
    return invoice;
  } catch (e) {
    throw Error(e.message);
  }
}
