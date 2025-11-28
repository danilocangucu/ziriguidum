import { sendPurchaseConfirmationEmail } from "@/app/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
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

      if (session.customer_details?.email) {
        const customerName = session.customer_details.name || "there";

        if (session.metadata) {
          if (session.metadata?.location) {
            console.log(
              `✅ Checkout session completed: ${session.id}. Sending confirmation email to ${session.customer_details.email}`
            );
            await sendPurchaseConfirmationEmail({
              email: session.customer_details.email!,
              name: customerName,
              location: session.metadata.location as
                | "online"
                | "inPerson"
                | "unknown",
            });
          }
        } else {
          console.log(
            "Sending email to myself: No metadata in successful session. Attaching session details."
          );
        }
      } else {
        console.log(
          "Sending email to myself: Customer email not provided. Attaching session details."
        );
      }
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
