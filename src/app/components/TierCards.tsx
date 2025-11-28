"use client";

import { Tier } from "../types/products";
import { formatTierDates } from "../utils/products";

type CheckoutButtonsProps = {
  currentTier: Tier;
  solidarityTier: Tier;
};

export default function TierCards({
  currentTier,
  solidarityTier,
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
    <ul>
      {[currentTier, solidarityTier].map((tier) => (
        <li key={tier.label}>
          <article>
            <h3>{tier.label}</h3>
            {tier.startDate && tier.endDate && (
              <p>
                {`(`}
                {formatTierDates(tier.startDate, tier.endDate)}
                {`)`}
              </p>
            )}
            <p>€{tier.price.toFixed(2)}</p>
            <button type="button" onClick={() => handleCheckout(tier.priceId)}>
              Sign up
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
}
