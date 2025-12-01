"use server";

import Stripe from "stripe";
import { SendMailClient } from "zeptomail";

type SendZeptomailParams = {
  recipient: { email: string; name: string };
  subject: string;
  text: string;
  html?: string;
};

const myEmail = process.env.ZEPTOMAIL_MY_ADDRESS;
const myName = "Danilo Canguçu";

export async function sendZeptomail({
  recipient,
  subject,
  text,
  html,
}: SendZeptomailParams) {
  const url = process.env.ZEPTOMAIL_URL;
  const token = process.env.ZEPTOMAIL_TOKEN;
  const senderEmail = process.env.ZEPTOMAIL_FROM;

  if (!url || !token || !senderEmail) {
    throw new Error("Missing ZeptoMail environment variables");
  }

  const client = new SendMailClient({ url, token });

  try {
    await client.sendMail({
      from: {
        address: senderEmail,
        name: myName,
      },
      to: [
        {
          email_address: {
            address: recipient.email,
            name: recipient.name,
          },
        },
      ],
      subject,
      textbody: text,
      ...(html ? { htmlbody: html } : {}),
    });
  } catch (error) {
    console.error("Error print:", error);
    console.dir(error, { depth: null, colors: true });
  }
}

export const sendPurchaseConfirmationEmail = async (params: {
  email: string;
  name: string;
  location: "online" | "inPerson" | "unknown";
}) => {
  const { email, name, location } = params;

  const subject = `Ziriguidum mini-Course - Purchase confirmation`;

  const onlineText = `
    Your spot in the online group is confirmed.
    The meetings will take place online in February on Mondays from 18:30 to 19:30 (CET, Central European Time).
    I’ll send the meeting link in January once I decide which tool we’ll use. I’m testing a few options next week to find the easiest and most interactive solution.
    If you’ve had experiences (good or bad) with online meeting tools and want to share them, I’d love to hear. Just reply to this email.
    Of course, if you have any questions, feel free to reach out anytime.
  `;

  const onlineHTML = `
<p>Your spot in the <strong>online group</strong> is confirmed.</p>
<p>The meetings will take place online in February on Mondays from 18:30 to 19:30 (CET, Central European Time).</p>
<p>I’ll send the meeting link in January once I decide which tool we’ll use. I’m testing a few options next week to find the easiest and most interactive solution.</p>
<p>If you’ve had experiences (good or bad) with online meeting tools and want to share them, I’d love to hear — just reply to this email.</p>
<p>Of course, if you have any questions, feel free to reach out anytime.</p>
`;

  const inPersonText = `
  Your spot in the in-person group here in Berlin (Neukölln) is confirmed.
  The meetings will take place on Tuesdays from 18:30 to 19:30 (CET, Central European Time).
  I’ll share the exact address at the beginning of January.
  Since the course takes place at my home, please let me know if you have any special needs so I can assist or make adjustments for your visits.
  If you have any questions in the meantime, feel free to reach out anytime.
  `;

  const inPersonHTML = `
<p>Your spot in the <strong>in-person group</strong> here in Berlin (Neukölln) is confirmed.</p>
<p>The meetings will take place on Tuesdays from 18:30 to 19:30 (CET, Central European Time).</p>
<p>I’ll share the exact address at the beginning of January.</p>
<p>Since the course takes place at my home, please let me know if you have any special needs so I can assist or make adjustments for your visits.</p>
<p>If you have any questions in the meantime, feel free to reach out anytime.</p>
`;

  const unknownGrouptext = `
  We received your payment, but could not determine your group. I’ll get in touch shortly.

  If you have any questions, feel free to reply to this email.
  `;

  const unknownGroupHTML = `
  <p>We received your payment, but could not determine your group. I’ll get in touch shortly.</p>
  <p>If you have any questions, feel free to reply to this email.</p>
  `;

  const locationString =
    location === "online"
      ? onlineText
      : location === "inPerson"
      ? inPersonText
      : unknownGrouptext;

  const locationHTML =
    location === "online"
      ? onlineHTML
      : location === "inPerson"
      ? inPersonHTML
      : unknownGroupHTML;

  // --- Email to CUSTOMER ---

  const text = `
Hello ${name}!

Thank you for joining the Ziriguidum mini-course!

${locationString}

If you have any questions, feel free to reply to this email.

Um abraço,
${myName}
`;

  const html = `
<p>Hello ${name}!</p>
<p>Thank you for joining the <strong>Ziriguidum mini-course!</strong></p>
${locationHTML}
<p>If you have any questions, feel free to reply to this email.</p>
<p>Um abraço,<br>${myName}</p>
`;

  await sendZeptomail({
    recipient: { email: email, name: name || "" },
    subject,
    text,
    html,
  });

  if (!myEmail) {
    console.warn(
      "ZEPTOMAIL_MY_ADDRESS is not set. Skipping internal copy email."
    );
    return;
  }

  // --- Email to ME ---

  await sendZeptomail({
    recipient: { email: myEmail, name: myName },
    subject: `Purchase by ${name || "Unknown Customer"}`,
    text: `
    A new purchase was made by ${
      name || "Unknown Customer"
    } (${email})\n\nCourse: ${location}
    `,
    html: `
    <p>
      A new purchase was made by 
      <strong>${name || "Unknown Customer"}</strong>
      (${email})
    </p>
    <p>
      Course: ${location}
    </p>
    `,
  });
};

export const sendUnverifiedPurchaseEmail = async (params: {
  email: string;
  name: string;
  logMessage: string;
}) => {
  const { email, name, logMessage } = params;

  const subject = `Ziriguidum mini-Course – Details to be confirmed`;

  if (email !== "unknown") {
    // --- Email to CUSTOMER ---
    const text = `
Hi ${name},

Thank you so much for signing up!

I couldn't verify whether you're joining the mini-course in person or online.
I’m going to check this and get back to you as soon as possible with more
information about your session.

If you want to contact me for any matter, please reply to this email.

Um abraço,
${myName}
`;

    const html = `
<p>Hi ${name},</p>

<p>Thank you so much for signing up!</p>

<p>
I couldn't verify whether you're joining the mini-course
<strong>in person</strong> or <strong>online</strong>.
</p>

<p>
I’m going to check this and get back to you as soon as possible with more
information about your session.
</p>

<p>If you want to contact me for any matter, please reply to this email.</p>

<p>Um abraço,<br>${myName}</p>
`;

    await sendZeptomail({
      recipient: { email, name },
      subject,
      text,
      html,
    });
  }

  // --- Email to ME ---
  if (!myEmail) {
    console.warn(
      "ZEPTOMAIL_MY_ADDRESS is not set. Skipping internal email from sendUnverifiedPurchaseEmail"
    );
    return;
  }

  const internalSubject = `Unverified Purchase – ${name || "Customer"}`;

  const internalText = `
A purchase was completed, but details are missing.

Logged info: ${logMessage}

Name: ${name}
Email: ${email}

Action needed: Verify manually whether this person is joining online or in person.
`;

  const internalHtml = `
<p><strong>Unverified purchase detected</strong></p>

<p>
Name: <strong>${name}</strong><br/>
Email: ${email}
</p>

<p>Logged info: ${logMessage}</p>

<p>
Action needed: Verify manually whether this person is joining
<strong>online</strong> or <strong>in person</strong>.
</p>

`;

  await sendZeptomail({
    recipient: { email: myEmail, name: myName },
    subject: internalSubject,
    text: internalText,
    html: internalHtml,
  });
};

export const sendExpiredSessionEmail = async (params: {
  logMessage: string;
  name: string | null | undefined;
  email: string | null | undefined;
}) => {
  const { logMessage, name, email } = params;

  if (!myEmail) {
    console.warn(
      "ZEPTOMAIL_MY_ADDRESS is not set. Skipping internal email from sendExpiredSessionEmail"
    );
    return;
  }

  const internalSubject = `Expired Checkout Session – ${name || "Customer"}`;

  const internalText = `
A checkout session expired.

Logged info: ${logMessage}

Name: ${name}
Email: ${email}

Action needed: Decide whether to reach out or ignore.
`;

  const internalHtml = `
<p><strong>Expired checkout session detected</strong></p>

<p>
Name: <strong>${name}</strong><br/>
Email: ${email}
</p>

<p>Logged info: ${logMessage}</p>

<p>Action needed: Decide whether to reach out or ignore.</p>
`;

  await sendZeptomail({
    recipient: { email: myEmail, name: myName },
    subject: internalSubject,
    text: internalText,
    html: internalHtml,
  });
};

export const sendUnhandledStripeEventEmail = async (event: Stripe.Event) => {
  console.log(`⚠️ Unhandled event type received: ${event.type}`);

  if (!myEmail) {
    console.warn(
      "ZEPTOMAIL_MY_ADDRESS is not set. Skipping internal email from sendUnhandledStripeEventEmail"
    );
    return;
  }

  const subject = `⚠️ Unhandled Stripe Event – ${event.type}`;

  const text = `
An unhandled Stripe event was received.

Event type: ${event.type}
Event ID: ${event.id}
Event data: ${JSON.stringify(event.data.object, null, 2)}

Please review this event in your Stripe dashboard.
`;

  const html = `
<p><strong>An unhandled Stripe event was received.</strong></p>

<p>
Event type: <strong>${event.type}</strong><br/>
Event ID: <strong>${event.id}</strong><br/>
Event data:<br/>
<pre>${JSON.stringify(event.data.object, null, 2)}</pre>
</p>

<p>Please review this event in your Stripe dashboard.</p>
`;

  await sendZeptomail({
    recipient: { email: myEmail, name: myName },
    subject,
    text,
    html,
  });
};

export const sendWebhookErrorEmail = async (params: {
  error: unknown;
  body: string;
}) => {
  if (!myEmail) {
    console.warn(
      "ZEPTOMAIL_MY_ADDRESS is not set. Skipping webhook error email."
    );
    return;
  }

  const { error, body } = params;

  const subject = `Ziriguidum mini-Course – Stripe Webhook Error`;

  const text = `
A Stripe webhook request failed before processing.

Error: ${
    error instanceof Error ? error.message : JSON.stringify(error, null, 2)
  }

${body ? `Raw request body:\n${body}` : ""}

Please check the logs for more details.
`;

  const html = `
<p><strong>A Stripe webhook request failed before processing.</strong></p>

<p>Error:</p>
<pre>${
    error instanceof Error ? error.message : JSON.stringify(error, null, 2)
  }</pre>

${body ? `<p>Raw request body:</p><pre>${body}</pre>` : ""}

<p>Please check the logs for more details.</p>
`;

  await sendZeptomail({
    recipient: { email: myEmail, name: myName },
    subject,
    text,
    html,
  });
};
