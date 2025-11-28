export interface Tier {
  label: string;
  price: number;
  priceId: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Product {
  label: string;
  tiers: {
    solidarity: Tier;
    earlyBird?: Tier;
    lateBird?: Tier;
    fullPrice?: Tier;
  };
}