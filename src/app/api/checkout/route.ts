import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    console.log("Incoming checkout request:", req.body);
    console.log("Stripe key exists?", !!process.env.STRIPE_SECRET_KEY);

    const { priceId } = (await req.json()) as {
      priceId: string;
    };

    if (!priceId) {
      console.error("No priceId provided");
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: [
        "card",
        "paypal",
        "link",
        "klarna",
        "sepa_debit",
        "mobilepay",
      ],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "origin"
      )}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log("Created checkout session:", session);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Error in /api/checkout:", err);
    return NextResponse.json(
      { error: "Something went wrong creating the checkout session" },
      { status: 500 }
    );
  }
}
