import { NavBar } from "../components/shared/NavBar"

export default function CancelPage() {
  return (
    <>
      <NavBar isSignUpPage={false} />
      <main className="u-container">
      <h1>Oops!</h1>
      <p>
        It looks like your payment was not completed. You can try again on the{" "}
        <a href="/sign-up">sign up page</a>.
      </p>
      <p>
        If you have any questions, please drop me a message at{" "}
        <a href="mailto:ziriguidum@danilocangucu.net">ziriguidum@danilocangucu.net</a>. I will be happy to respond!
      </p>
      <p>— Danilo Canguçu</p>
    </main>
    </>
  );
}
