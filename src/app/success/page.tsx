import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface SuccessPageProps {
    searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const { session_id } = await searchParams;

    if (!session_id) {
        return <p>Invalid access.</p>;
    }

    let session: Stripe.Checkout.Session | null = null;
    let errorMessage: string | null = null;

    try {
        session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== "paid") {
            errorMessage = "Payment not completed or session invalid.";
        }
    } catch (err) {
        console.error(err);
        errorMessage = "Error verifying your session.";
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    const email = session?.customer_details?.email ?? "the email you used to make the payment";
    const name = session?.customer_details?.name ?? null;

    return (
        <main>
            <h1>Obrigado{name ? `, ${name}` : ""}!</h1>
            <p>
                Thank you for joining the Ziriguidum mini-course!
            </p>
            <p>
                Your registration is confirmed. An email with information about the course should arrive soon at <strong>{email}</strong>.
            </p>
            <p>
                You’ll receive an email soon with all the information about the meetings.
                If it hasn’t arrived after a while (check your spam folder just in case),
                or if you have any questions, drop me a message at <a href="mailto:ziriguidum@danilocangucu.net">ziriguidum@danilocangucu.net</a>; I’ll be happy to respond.
            </p>
            <p>
                I’m looking forward to sharing the rhythms of Brazil with you!
            </p>
            <p>— Danilo Canguçu</p>
        </main>
    );
}
