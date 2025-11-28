import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  console.log("🚨 Webhook endpoint was called!");

  const sig = req.headers.get("stripe-signature")!;

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("✅ Checkout session completed event received!");
      console.log("Full session object:", session);

      let customerName = "Unknown";

      console.log("Customer details:", session.customer_details);

      if (session.customer_details?.name) {
        console.log("Customer name found in customer_details.");
        customerName = session.customer_details.name;
      }

      console.log(
        `Simulated email: Customer bought successfully! Name: ${customerName}, Email: ${session.customer_email}`
      );
      break;

    case "checkout.session.expired":
      const expiredSession = event.data.object as Stripe.Checkout.Session;
      console.log(`⏳ Checkout session expired: ${expiredSession.id}`);
      break;

    case "payment_intent.succeeded":
      const piSucceeded = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent succeeded: ${piSucceeded.id}`);
      break;

    case "payment_intent.payment_failed":
      const piFailed = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ PaymentIntent failed: ${piFailed.id}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
};
