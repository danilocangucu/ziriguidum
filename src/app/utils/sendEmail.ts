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
  const urlEnv = process.env.ZEPTOMAIL_URL;
  const token = process.env.ZEPTOMAIL_TOKEN;
  const from = process.env.ZEPTOMAIL_FROM;

  if (!urlEnv || !token || !from) {
    throw new Error("Missing ZeptoMail environment variables");
  }

  const urlsToTest = [
    urlEnv, // as set in secrets
    urlEnv.endsWith("/") ? urlEnv.slice(0, -1) : urlEnv + "/", // add/remove trailing slash
    "https://api.zeptomail.eu/v1.1/email", // full path with API version
  ];

  for (const url of urlsToTest) {
    console.log("Trying ZeptoMail URL:", url);
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

      console.log("✅ Email sent via ZeptoMail with URL:", url, {
        to: to.map((r) => r.address),
        subject,
      });
      break; // stop after the first successful attempt
    } catch (error) {
      console.error("❌ Failed with URL:", url, error);
    }
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
