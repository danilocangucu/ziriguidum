import Stripe from "stripe";
import { NavBar } from "../components/shared/NavBar";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface SuccessPageProps {
    searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const { session_id } = await searchParams;

    if (!session_id) {
        if (!session_id) {
            return (
                <>
                    <NavBar showSignUpButton={false} />
                    <main className="u-container">
                        <h1>Hmm… something’s not quite right.</h1>
                        <p>
                      This page isn’t available in this way. If you arrived here by
                      mistake, don’t worry — you can return to the homepage or try the
                      process again.
                  </p>
                  <p>
                      If the issue continues, feel free to email me at{" "}
                          <a href="mailto:ziriguidum@danilocangucu.net">
                              ziriguidum@danilocangucu.net
                          </a>
                          .
                      </p>
                  </main>
              </>
          );
      }
  }

    let session: Stripe.Checkout.Session | null = null;
    let errorMessage: string | null = null;

    try {
        session = await stripe.checkout.sessions.retrieve(session_id);

      if (session.payment_status !== "paid") {
          errorMessage = "It wasn't possible to confirm your payment.";
      }
  } catch (err) {
      console.error(err);
      errorMessage = "Something went wrong while verifying your payment.";
  }

    if (errorMessage) {
        return (
            <>
                <NavBar showSignUpButton={false} />
                <main className="u-container">
                    <h1>Hmm… something’s not quite right.</h1>
                    <p>
                        ${errorMessage}
                    If you arrived here by mistake, don’t worry — you can return to the
                    homepage or try the process again.
                </p>
                <p>
                    If the issue continues, feel free to email me at{" "}
                      <a href="mailto:ziriguidum@danilocangucu.net">
                          ziriguidum@danilocangucu.net
                      </a>
                      .
                  </p>
              </main>
          </>
      );
  }

    const email =
        session?.customer_details?.email ??
        "the email you used to make the payment";
    const name = session?.customer_details?.name ?? null;

    return (
        <>
            <NavBar showSignUpButton={true} />
            <main className="u-container">
                <h1>Obrigado{name ? `, ${name}` : ""}!</h1>
              <p>Thank you for joining the Ziriguidum mini-course!</p>
              <p>
                  Your registration is confirmed. An email with information about the
                  course should arrive soon at <strong>{email}</strong>.
              </p>
              <p>
                  If it hasn’t arrived after a while (check your spam folder just in
                  case), or if you have any questions, drop me a message at{" "}
                  <a href="mailto:ziriguidum@danilocangucu.net">
                      ziriguidum@danilocangucu.net
                  </a>
                  ; I’ll be happy to respond.
              </p>
              <p>I’m looking forward to sharing the rhythms of Brazil with you!</p>
              <p>— Danilo Canguçu</p>
          </main>
      </>
  );
}
