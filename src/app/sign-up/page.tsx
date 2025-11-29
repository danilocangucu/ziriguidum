import { NavBar } from "../components/shared/NavBar";
import Help from "../components/SignUp/Help";
import Intro from "../components/SignUp/Intro";
import RegistrationClosed from "../components/SignUp/RegistrationClosed";
import TierSection from "../components/SignUp/TierSection";
import { products } from "../utils/products";
import { getActiveTier } from "../utils/signUpUtils";

export default function Page() {
  const today = new Date();

  const inPersonTier = getActiveTier(products.inPerson.tiers, today);
  const onlineTier = getActiveTier(products.online.tiers, today);

  return (
    <>
      <NavBar isSignUpPage={true} />

      <main>
        <Intro />

        {onlineTier && inPersonTier ? (
          <>
            <TierSection
              title="Online"
              description="Join us from anywhere"
              schedule="Sessions take place every Monday in February 2026, from 18.30 to 19.30 (CET)."
              currentTier={onlineTier}
              solidarityTier={products.online.tiers.solidarity}
              secondaryBackground={true}
            />
            <TierSection
              title="In Person"
              description="Come join us in Berlin, in Neukölln"
              schedule="Sessions are held every Tuesday in February 2026, from 18.30 to 19.30."
              currentTier={inPersonTier}
              solidarityTier={products.inPerson.tiers.solidarity}
            />
            <Help />
          </>
        ) : (
          <RegistrationClosed />
        )}
    </main>
    </>
  );
}
