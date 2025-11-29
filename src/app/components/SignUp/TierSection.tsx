import { Tier } from "../../types/products";
import TierCards from "./TierCards";
import styles from "./tiersection.module.css";

interface TierSectionProps {
  title: string;
  description: string;
  schedule: string;
  currentTier: Tier;
  solidarityTier: Tier;
    secondaryBackground?: boolean;
}

export default function TierSection({
  title,
  description,
  schedule,
  currentTier,
  solidarityTier,
    secondaryBackground = false,
}: TierSectionProps) {
  return (
      <section className={`${secondaryBackground ? "padding-bottom-xs bg-color-secondary" : "padding-bottom-xs"}`}>
          <section className={`u-container`}>
              <h2>{title}</h2>
              <p><em>{description}</em></p>
              <p>{schedule}</p>
              <TierCards currentTier={currentTier} solidarityTier={solidarityTier} />
          </section>
    </section>
  );
}
