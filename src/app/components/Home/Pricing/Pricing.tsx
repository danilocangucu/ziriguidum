import SignUpRouteButton from "../../shared/SignUpRouteButton";
import PricingTables from "./PricingTables";

export default function Pricing() {
  return (
    <section className="u-container padding-bottom-s bg-color-secondary">
        <h2>Pricing</h2>
        <article>
          <p>
            I want this mini-course to be accessible while valuing the time and energy we spend exploring Brazilian music together. <strong>If you sign up early, you can enjoy a discount</strong> — a little incentive to secure your spot and make sure we all have a full, lively group from the start.
          </p>
          <p>
            For those who cannot afford the full price, there is a <strong>solidarity price that will always remain the same</strong>, so everyone can join and experience the music.
          </p>
          <PricingTables />
          <SignUpRouteButton />
        </article>
      </section>
  );
}
