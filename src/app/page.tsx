import SongOfTheDay from "./components/Home/SongOfTheDay/SongOfTheDay";
import Help from "./components/Home/Help";
import HowItWorks from "./components/Home/HowItWorks";
import Intro from "./components/Home/Intro/Intro";
import PreviousListeners from "./components/Home/PreviousListeners/PreviousListeners";
import Pricing from "./components/Home/Pricing/Pricing";
import YourCurator from "./components/Home/YourCurator";
import { NavBar } from "./components/shared/NavBar";

export default function HomePage() {
  return (
    <>
    <NavBar isSignUpPage={false} />
    <main>
        <Intro />
        <YourCurator />
        <PreviousListeners />
        <SongOfTheDay />
        <HowItWorks />
        <Pricing />
        <Help />
    </main>
    </> 
  )
}