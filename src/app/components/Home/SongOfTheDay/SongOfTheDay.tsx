import NewsletterSection from "./NewsletterSection";
import SongCard from "./SongCard";

export default function SongOfTheDay() {
  return (
    <section className="bg-color-secondary">
      <section className="u-container">
        <h2>Song of the day</h2>
        <SongCard />
        <h3 className="margin-top-xs">
          Songs in your mailbox
        </h3>
        <NewsletterSection />
      </section>
    </section>
  );
}
