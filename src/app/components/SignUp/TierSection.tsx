import { Tier } from "../../types/products";
import TierCards from "./TierCards";

interface TierSectionProps {
  title: string;
  description: string;
  schedule: string;
  currentTier: Tier;
  solidarityTier: Tier;
}

export default function TierSection({
  title,
  description,
  schedule,
  currentTier,
  solidarityTier,
}: TierSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{schedule}</p>
      <TierCards currentTier={currentTier} solidarityTier={solidarityTier} />
    </section>
  );
}
