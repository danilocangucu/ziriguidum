import { Product } from "../types/products";

export const products: Record<"inPerson" | "online", Product> = {
  inPerson: {
    label: "In-Person",
    tiers: {
      solidarity: {
        label: "Solidarity",
        price: 50,
        priceId: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_SOLIDARITY!,
      },
      earlyBird: {
        label: "Early Bird",
        price: 63.75,
        priceId: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_EARLY_BIRD!,
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-21"),
      },
      lateBird: {
        label: "Late Bird",
        price: 67.5,
        priceId: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_LATE_BIRD!,
        startDate: new Date("2025-12-22"),
        endDate: new Date("2026-01-11"),
      },
      fullPrice: {
        label: "Full Price",
        price: 75,
        priceId: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_FULL!,
        startDate: new Date("2026-01-12"),
        endDate: new Date("2026-02-03"),
      },
    },
  },
  online: {
    label: "Online",
    tiers: {
      solidarity: {
        label: "Solidarity",
        price: 40,
        priceId: process.env.NEXT_PUBLIC_PRICE_ONLINE_SOLIDARITY!,
      },
      earlyBird: {
        label: "Early Bird",
        price: 55.25,
        priceId: process.env.NEXT_PUBLIC_PRICE_ONLINE_EARLY_BIRD!,
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-21"),
      },
      lateBird: {
        label: "Late Bird",
        price: 58.5,
        priceId: process.env.NEXT_PUBLIC_PRICE_ONLINE_LATE_BIRD!,
        startDate: new Date("2025-12-22"),
        endDate: new Date("2026-01-11"),
      },
      fullPrice: {
        label: "Full Price",
        price: 65,
        priceId: process.env.NEXT_PUBLIC_PRICE_ONLINE_FULL!,
        startDate: new Date("2026-01-12"),
        endDate: new Date("2026-02-03"),
      },
    },
  },
};

export function formatTierDates(startDate: Date, endDate: Date): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const pad = (n: number) => n.toString().padStart(2, "0");

  // Get day and month
  const startDay = pad(start.getUTCDate());
  const startMonth = pad(start.getUTCMonth() + 1); // months are 0-indexed
  const endDay = pad(end.getUTCDate());
  const endMonth = pad(end.getUTCMonth() + 1);

  // If start and end are in the same month: "01.–21.12"
  if (startMonth === endMonth) {
    return `${startDay}.–${endDay}.${startMonth}`;
  }

  // If different months: "22.12–11.01"
  return `${startDay}.${startMonth}–${endDay}.${endMonth}`;
}

export function getProductLocationByPriceId(priceId: string): {
  location: string;
} {
  for (const [location, product] of Object.entries(products) as [
    "inPerson" | "online",
    Product
  ][]) {
    for (const tier of Object.values(product.tiers)) {
      if (tier.priceId === priceId) {
        return { location };
      }
    }
  }
  return { location: "unknown" };
}