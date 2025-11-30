import Intro from "./components/Home/Intro/Intro";
import YourCurator from "./components/Home/YourCurator";
import { NavBar } from "./components/shared/NavBar";

export default function HomePage() {
  return (
    <>
    <NavBar isSignUpPage={false} />
    <main>
        <Intro />
        <YourCurator />
    </main>
    </> 
  )
}