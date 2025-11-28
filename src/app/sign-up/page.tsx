import TierCards from "../components/TierCards";
import { Product, Tier } from "../types/products";
import { products } from "../utils/products";

export function getActiveTier(
  tiers: Product["tiers"],
  today: Date
): Tier | undefined {
  // Find current tier
  const current = Object.values(tiers).find(
    (tier) =>
      tier.startDate &&
      tier.endDate &&
      today >= tier.startDate &&
      today <= tier.endDate
  );

  if (current) return current;

  // If no active tier, return the next upcoming tier
  const upcoming = Object.values(tiers)
    .filter((tier) => tier.startDate && today < tier.startDate)
    .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());

  return upcoming[0];
}

export default function Page() {
  const today = new Date();

  const inPersonTier = getActiveTier(products.inPerson.tiers, today);
  const onlineTier = getActiveTier(products.online.tiers, today);

  return (
    <main>
      <h1>Your Brazilian music journey starts soon!</h1>
      <p>
        I can’t wait to share the rhythms, stories, and little surprises of
        Brazilian music with you.
      </p>
      <p>
        Decide how you want to join — in person or online — and confirm your
        attendance.
      </p>
      <p>
        Practical information for the sessions, including the online meeting
        link or my home address in Berlin, will be shared after registration.
        Please use a valid email address when signing up so you don’t miss any
        details.
      </p>

      {onlineTier && inPersonTier && (
        <>
          <h2>Online</h2>
          <p>Join us from anywhere</p>
          <p>
            Sessions take place every Monday in February 2026, from 18.30 to
            19.30 (CET).
          </p>
          <TierCards
            currentTier={onlineTier}
            solidarityTier={products.online.tiers.solidarity}
          />
          <h2>In Person</h2>
          <p>Come join us in Berlin, in Neukölln.</p>
          <p>
            Sessions are held every Tuesday in February 2026, from 18.30 to
            19.30.
          </p>
          <TierCards
            currentTier={inPersonTier}
            solidarityTier={products.inPerson.tiers.solidarity}
          />
          <p>
            Questions or trouble with registration? Contact me at{" "}
            <a href="mailto:ziriguidum@danilocangucu.net">
              ziriguidum@danilocangucu.net
            </a>
            .
          </p>
          <p>— Danilo Canguçu</p>
        </>
      )}

      {!inPersonTier && !onlineTier && (
        <>
          <p>
            The current mini-courses have already started, so registrations are
            now closed.
          </p>
          <p>
            You can join future sessions — feel free to contact me at{" "}
            <a href="mailto:ziriguidum@danilocangucu.net">
              ziriguidum@danilocangucu.net
            </a>
            if you want to be notified about the next one.
          </p>
          <p>Thank you for your interest!</p>
          <p>— Danilo Canguçu</p>
        </>
      )}
    </main>
  );
}
