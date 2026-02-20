// api/stripe-webhooks.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful subscription payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // logic to update your database: User.update({ email: session.customer_email, plan: 'Pro' })
    console.log(`Payment successful for: ${session.customer_email}`);
  }

  res.json({ received: true });
}
