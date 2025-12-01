import NewsletterSection from "./NewsletterSection";
import SongCard from "./SongCard";

export default function DailyZiriguidum() {
  return (
    <section className="u-container bg-color-secondary">
    <h2>Ziriguidum of the day</h2>
      <SongCard />
      <NewsletterSection />
    </section>
  )
}