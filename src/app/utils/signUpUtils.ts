import { Product, Tier } from "../types/products";

export function getActiveTier(
  tiers: Product["tiers"],
  today: Date
): Tier | undefined {
  // Find current tier
  const current = Object.values(tiers).find(
    (tier) =>
      tier.startDate &&
      tier.endDate &&
      today >= tier.startDate &&
      today <= tier.endDate
  );

  if (current) return current;

  // If no active tier, return the next upcoming tier
  const upcoming = Object.values(tiers)
    .filter((tier) => tier.startDate && today < tier.startDate)
    .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());

  return upcoming[0];
}