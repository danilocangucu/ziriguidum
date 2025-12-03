import { Product, Tier } from "../types/products";

export const products: Record<"inPerson" | "online", Product> = {
  online: {
    label: "Online",
    tiers: {
      solidarity: {
        label: "Solidarity",
        prices: {
          fourSessions: 40,
          oneSession: 10,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_ONLINE_SOLIDARITY!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_ONLINE_SOLIDARITY_ONE_SESSION!,
        },
      },

      earlyBird: {
        label: "Early Bird",
        prices: {
          fourSessions: 55.25,
          oneSession: 14,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_ONLINE_EARLY_BIRD!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_ONLINE_EARLY_BIRD_ONE_SESSION!,
        },
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-21"),
      },

      lateBird: {
        label: "Late Bird",
        prices: {
          fourSessions: 58.5,
          oneSession: 15,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_ONLINE_LATE_BIRD!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_ONLINE_LATE_BIRD_ONE_SESSION!,
        },
        startDate: new Date("2025-12-22"),
        endDate: new Date("2026-01-11"),
      },

      fullPrice: {
        label: "Full Price",
        prices: {
          fourSessions: 65,
          oneSession: 16,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_ONLINE_FULL!,
          oneSession: process.env.NEXT_PUBLIC_PRICE_ONLINE_FULL_ONE_SESSION!,
        },
        startDate: new Date("2026-01-12"),
        endDate: new Date("2026-02-03"),
      },
    },
  },
  inPerson: {
    label: "In-Person",
    tiers: {
      solidarity: {
        label: "Solidarity",
        prices: {
          fourSessions: 50,
          oneSession: 12.5,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_SOLIDARITY!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_IN_PERSON_SOLIDARITY_ONE_SESSION!,
        },
      },
      earlyBird: {
        label: "Early Bird",
        prices: {
          fourSessions: 63.75,
          oneSession: 16,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_EARLY_BIRD!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_IN_PERSON_EARLY_BIRD_ONE_SESSION!,
        },
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-21"),
      },
      lateBird: {
        label: "Late Bird",
        prices: {
          fourSessions: 67.5,
          oneSession: 17,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_LATE_BIRD!,
          oneSession:
            process.env.NEXT_PUBLIC_PRICE_IN_PERSON_LATE_BIRD_ONE_SESSION!,
        },
        startDate: new Date("2025-12-22"),
        endDate: new Date("2026-01-11"),
      },
      fullPrice: {
        label: "Full Price",
        prices: {
          fourSessions: 75,
          oneSession: 18,
        },
        priceIds: {
          fourSessions: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_FULL!,
          oneSession: process.env.NEXT_PUBLIC_PRICE_IN_PERSON_FULL_ONE_SESSION!,
        },
        startDate: new Date("2026-01-12"),
        endDate: new Date("2026-02-03"),
      },
    },
  },
};

export const inPersonActiveTier = getActiveTier(
  products.inPerson.tiers,
  new Date()
);

export const onlineActiveTier = getActiveTier(
  products.online.tiers,
  new Date()
);

export const solidarityTier = {
  inPerson: products.inPerson.tiers.solidarity,
  online: products.online.tiers.solidarity,
};

export const tierOrder: Array<keyof Product["tiers"]> = [
  "solidarity",
  "earlyBird",
  "lateBird",
  "fullPrice",
];

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

// TODO check if needs to be updated for new price structure
export function getProductLocationByPriceId(priceId: string): {
  location: string;
} {
  for (const [location, product] of Object.entries(products) as [
    "inPerson" | "online",
    Product
  ][]) {
    for (const tier of Object.values(product.tiers)) {
      if (tier.priceIds.fourSessions === priceId) {
        return { location };
      }
    }
  }
  return { location: "unknown" };
}
