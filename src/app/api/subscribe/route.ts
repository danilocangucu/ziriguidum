import { NextResponse } from "next/server";
import MailerLite from "@mailerlite/mailerlite-nodejs";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const mailerlite = new MailerLite({
      api_key: process.env.MAILERLITE_API_KEY!,
    });

    const params = {
      email,
      status: "unconfirmed" as const,
      groups: [process.env.MAILERLITE_GROUP_ID!],
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    return NextResponse.json({ success: true, data: response.data });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data || "Something went wrong" },
      { status: 500 }
    );
  }
}
