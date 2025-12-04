"use client";

import { SessionType, Tier } from "@/app/types/products";
import { formatTierDates } from "@/app/utils/productsUtils";
import Button from "../shared/Button";
import styles from './tiercards.module.css';

type CheckoutButtonsProps = {
  currentTier: Tier;
  solidarityTier: Tier;
  sessionType: SessionType;
};

export default function TierCards({
  currentTier,
  solidarityTier,
  sessionType
}: CheckoutButtonsProps) {
  const handleCheckout = async (priceId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.assign(data.url);
      else console.error("Error creating checkout session", data.error);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <ul className={styles.ul}>
      {[solidarityTier, currentTier].map((tier) => {
        const price = tier.prices[sessionType];
        const priceId = tier.priceIds[sessionType];

        return (
        <li key={tier.label} className={styles.li}>
          <article className={styles.tiercard}>
            <h3 className={styles.h3}>{tier.label}</h3>
            <p className={styles.dates}>{tier.startDate && tier.endDate ? (
              <em>
                {formatTierDates(tier.startDate, tier.endDate)}
              </em>
            ) : (
              <em>
                No deadlines
              </em>
            )}
            </p>
              <p className={styles.price}><strong>€{price.toFixed(2)}</strong></p>
              <Button className={styles.button} type="button" onClick={() => handleCheckout(priceId)}>
              <strong>Sign up</strong>
            </Button>
          </article>
        </li>
        )
      })}
    </ul>
  );
}
