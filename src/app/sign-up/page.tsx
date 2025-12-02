import { Metadata } from "next";
import { NavBar } from "../components/shared/NavBar";
import Help from "../components/SignUp/Help";
import Intro from "../components/SignUp/Intro";
import RegistrationClosed from "../components/SignUp/RegistrationClosed";
import TierSection from "../components/SignUp/TierSection";
import { inPersonActiveTier, onlineActiveTier, solidarityTier } from "../utils/productsUtils";

export const metadata: Metadata = {
  title: "Ziriguidum - Sign Up",
  description: "Join the Ziriguidum mini-course and explore essential Brazilian music.",
};

export default function Page() {
  return (
    <>
      <NavBar showSignUpButton={true} />

      <main>
        <Intro />

        {inPersonActiveTier && onlineActiveTier ? (
          <>
            <TierSection
              title="Online"
              description="Join us from anywhere"
              schedule="Sessions take place every Monday in February 2026, from 18.30 to 19.30 (CET)."
              currentTier={onlineActiveTier}
              solidarityTier={solidarityTier.online}
              secondaryBackground={true}
            />
            <TierSection
              title="In Person"
              description="Come join us in Berlin, in Neukölln"
              schedule="Sessions are held every Tuesday in February 2026, from 18.30 to 19.30."
              currentTier={inPersonActiveTier}
              solidarityTier={solidarityTier.inPerson}
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
