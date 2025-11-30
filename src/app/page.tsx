import Intro from "./components/Home/Intro";
import { NavBar } from "./components/shared/NavBar";

export default function HomePage() {
  return (
    <>
    <NavBar isSignUpPage={false} />
    <main>
    <Intro />
    </main>
    </> 
  )
}