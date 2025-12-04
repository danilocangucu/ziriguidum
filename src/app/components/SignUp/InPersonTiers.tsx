import { Tier } from "@/app/types/products";
import TierCards from "./TierCards";
import { solidarityTier } from "@/app/utils/productsUtils";

export default function InPersonTiers({ inPersonActiveTier }: { inPersonActiveTier: Tier }) {
  return (
    <section className="u-container padding-bottom-xs">
        <h2>In Person</h2>
        <p>
          <em>Come join us in Berlin, in Neukölln</em>
        </p>
        <p>
          Sessions are held every Tuesday in February 2026, from 18.30 to 19.30.
        </p>
        <h3>One session</h3>
        <p>
          You can choose your preferred session now or later. If you do not
          choose now, you will receive a code on your e-mail that needs to be
          redeemed at least one day before the session. Each session can be
          attended by 10 people. You will be informed when spots of a session
          are running out.
        </p>
        <p>
          If you are buying a session as a gift, you will receive a code that
          can be redeemed by the recipient. With this code, the recipient can
          join the session of their choice and enter their contact information.
        </p>
        <TierCards
          currentTier={inPersonActiveTier}
          solidarityTier={solidarityTier.inPerson}
          sessionType="oneSession"
        />
        <h3>Four sessions</h3>
        <p>
          A great choice for those who want to dive deeper into the material and
          attend multiple sessions.
        </p>
        <p>
          If you are buying the sessions as a gift, you will receive a code that
          can be redeemed by the recipient. With this code, the recipient can
          enter their contact information to attend the sessions.
        </p>
        <TierCards
          currentTier={inPersonActiveTier}
          solidarityTier={solidarityTier.inPerson}
          sessionType="fourSessions"
        />
      </section>
  );
}