import Stripe from "stripe";
import { sendExpiredSessionEmail, sendPurchaseConfirmationEmail, sendUnverifiedPurchaseEmail, sendWebhookErrorEmail } from "./emailUtils";

export function getMissingWebhookEnvVars(): string[] {
  const missing = [
    !process.env.STRIPE_SECRET_KEY ? "STRIPE_SECRET_KEY" : null,
    !process.env.STRIPE_WEBHOOK_SECRET ? "STRIPE_WEBHOOK_SECRET" : null,
  ].filter(Boolean) as string[];
  return missing;
}

export function logMissingWebhookEnvVars(missing: string[]): void {
  if (missing.length === 0) return;
  console.error(`❌ Missing required environment variable(s): ${missing.join(", ")}`);
}

export async function alertWebhookEnvVarIssue(missing: string[]): Promise<void> {
  if (missing.length === 0) return;
  const message = `Missing required Stripe environment variable(s): ${missing.join(", ")}`;
  await sendWebhookErrorEmail({
    error: new Error(message),
    body: "Webhook was called but env vars are missing",
  });
}


export function formatInternalEmailLog(
  extraInfo: string,
  session: Stripe.Checkout.Session
): string {
  return `Sending email to myself: ${extraInfo}
Session details: ${JSON.stringify(session, null, 2)}`;
}

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`💰 Checkout session completed: ${session.id}.`);

  const email = session.customer_details?.email;
  const name = session.customer_details?.name || "there";
  const location = session.metadata?.location as "online" | "inPerson" | "unknown";

  // Something is missing
  if (!email || !session.metadata || !location) {
    let extraInfo = "Checkout session completed but ";
    if (!email) extraInfo += "customer email not provided.";
    else if (!session.metadata) extraInfo += "no metadata found.";
    else extraInfo += "missing location in metadata.";

    const logMessage = formatInternalEmailLog(extraInfo, session);
    await sendUnverifiedPurchaseEmail({ name, email: email || "unknown", logMessage });
    return;
  }

  // Everything is present
  const logMessage = formatInternalEmailLog(
    "Checkout session completed with location metadata.",
    session
  );
  console.log(logMessage);

  await sendPurchaseConfirmationEmail({ email, name, location });
}

export async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email;
  const name = session.customer_details?.name;

  let extraInfo = "Checkout session expired.";
  if (!email && !name) extraInfo += " Customer email and name not provided.";
  else if (!email) extraInfo += " Customer email not provided.";
  else if (!name) extraInfo += " Customer name not provided.";

  const logMessage = formatInternalEmailLog(extraInfo, session);
  console.log(`⌛ ${logMessage}`);

  await sendExpiredSessionEmail({ logMessage, name, email });
}
