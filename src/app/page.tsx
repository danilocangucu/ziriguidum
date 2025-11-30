import Intro from "./components/Home/Intro/Intro";
import PreviousListeners from "./components/Home/PreviousListeners/PreviousListeners";
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
    </main>
    </> 
  )
}