import { Metadata } from "next";
import { NavBar } from "../components/shared/NavBar";
import Help from "../components/SignUp/Help";
import Intro from "../components/SignUp/Intro";
import RegistrationClosed from "../components/SignUp/RegistrationClosed";
import { inPersonActiveTier, onlineActiveTier } from "../utils/productsUtils";
import OnlineTiers from "../components/SignUp/OnlineTiers";
import InPersonTiers from "../components/SignUp/InPersonTiers";

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
            <OnlineTiers onlineActiveTier={onlineActiveTier} />
            <InPersonTiers inPersonActiveTier={inPersonActiveTier} />
            <Help />
          </>
        ) : (
          <RegistrationClosed />
        )}
    </main>
    </>
  );
}
