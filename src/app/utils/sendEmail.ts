"use server";

import { SendMailClient } from "zeptomail";

type SendZeptomailParams = {
  to: Array<{ address: string; name: string }>;
  subject: string;
  text: string;
  html?: string;
};

export async function sendZeptomail({
  to,
  subject,
  text,
  html,
}: SendZeptomailParams) {
  const url = process.env.ZEPTOMAIL_URL;
  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.ZEPTOMAIL_FROM;

  if (!url || !token || !from) {
    throw new Error("Missing ZeptoMail environment variables");
  }

  const client = new SendMailClient({ url, token });

  try {
    await client.sendMail({
      from,
      to: to.map((recipient) => ({
        email_address: {
          address: recipient.address,
          name: recipient.name,
        },
      })),
      subject,
      textbody: text,
      ...(html ? { htmlbody: html } : {}),
    });

    console.log("Email sent via ZeptoMail:", {
      to: to.map((r) => r.address),
      subject,
    });
  } catch (error) {
    console.error("Failed to send email via ZeptoMail:", error);
  }
}

export const sendPurchaseConfirmationEmail = async (params: {
  email: string;
  name?: string | null;
  location: "online" | "inPerson" | "unknown";
}) => {
  const { email, name, location } = params;

  const subject = "Your Ziriguidum Mini-Course Confirmation";

  const locationLine =
    location === "online"
      ? "Your spot in the ONLINE group is confirmed."
      : location === "inPerson"
      ? "Your spot in the IN-PERSON group (Berlin, Neukölln) is confirmed."
      : "We received your payment, but could not determine your group. I’ll get in touch shortly.";

  const text = `
Hello ${name}!

Thank you for joining the Ziriguidum mini-course!

${locationLine}

If you have any questions, feel free to reply to this email.

Um abraço,
Danilo
`;

  const html = `
<p>Hello ${name}!</p>
<p>Thank you for joining the <strong>Ziriguidum</strong> mini-course!</p>
<p>${locationLine}</p>
<p>If you have any questions, feel free to reply to this email.</p>
<p>Um abraço,<br>Danilo</p>
`;

  await sendZeptomail({
    to: [{ address: email, name: name || "" }],
    subject,
    text,
    html,
  });
};
