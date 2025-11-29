import {
  sendUnhandledStripeEventEmail,
  sendWebhookErrorEmail,
} from "@/app/utils/emailUtils";
import {
  alertWebhookEnvVarIssue,
  getMissingWebhookEnvVars,
  handleCheckoutSessionCompleted,
  logMissingWebhookEnvVars,
} from "@/app/utils/stripeUtils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const missing = getMissingWebhookEnvVars();
  if (missing.length > 0) {
    logMissingWebhookEnvVars(missing);
    await alertWebhookEnvVarIssue(missing);
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("⚠️ Failed to construct Stripe event:", error);
    await sendWebhookErrorEmail({ error, body });
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(session);
      break;

    case "checkout.session.expired":
      // TODO: decide if I want to handle expired sessions with emails
      // await handleCheckoutSessionExpired(session);
      console.log("Checkout session expired:", session.id);
      break;

    default:
      await sendUnhandledStripeEventEmail(event);
  }

  return NextResponse.json({ received: true });
};
