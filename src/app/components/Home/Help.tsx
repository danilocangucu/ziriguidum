import Link from "next/link";

export default function Help() {
  return (
    <section className="padding-bottom-s">
      <section className="u-container">
        <h2>Questions or requests?</h2>
        <article>
          <p>
            <em>Ziriguidum – An essential Brazilian music mini-course</em> can also be offered for <strong>Spanish or Portuguese speakers</strong>, or organised <strong>in different locations around Berlin, elsewhere in Germany, across Europe, or online</strong>, for private or small groups — I’d be happy to create a mini-course that works for you.
          </p>
          <p>
            If you have any questions, need help reserving your spot, or just want to know more, feel free to reach out. You can contact me at <Link href="mailto:ziriguidum@danilocangucu.net">ziriguidum@danilocangucu.net</Link>.
          </p>
          <p>
            Thank you for your interest in this mini-course. I hope to share it with you soon!
          </p>
          <p className="margin-bottom-0 padding-bottom-2xs">
            <em>
              Um abraço,<br />
              Danilo Canguçu
            </em>
          </p>
        </article>
      </section>
    </section>
  );
}
