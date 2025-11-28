"use server";

import { SendMailClient } from "zeptomail";

type SendZeptomailParams = {
  recipient: { email: string; name: string };
  subject: string;
  text: string;
  html?: string;
};

const myEmail = process.env.ZEPTOMAIL_MY_ADDRESS;

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
        name: "Danilo Canguçu",
      },
      to: {
        email_address: {
          address: recipient.email,
          name: recipient.name,
        },
      },
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
  name?: string | null;
  location: "online" | "inPerson" | "unknown";
}) => {
  const { email, name, location } = params;

  const subject = "Ziriguidum Mini-Course - Purchase Confirmation";

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

  await sendZeptomail({
    recipient: { email: myEmail, name: "Danilo" },
    subject: `Purchase by ${name || "Unknown Customer"}`,
    text: `
    A new purchase was made by ${
      name || "Unknown Customer"
    } (${email})\n\nCourse: ${locationLine}
    `,
    html: `
    <p>
      A new purchase was made by 
      <strong>${name || "Unknown Customer"}</strong>
      (${email})
    </p>
    <p>
      Course: ${locationLine}
    </p>
    `,
  });
};

