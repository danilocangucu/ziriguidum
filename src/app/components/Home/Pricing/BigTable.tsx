import { formatTierDates, onlineActiveTier, products, tierOrder } from "@/app/utils/products";
import styles from "./bigtable.module.css";
import { Tier } from "@/app/types/products";
import { inPersonActiveTier, solidarityTier } from "@/app/utils/products";

export default function BigTable() {
  return (
    <table className={styles["big-table"]}>
      <thead>
        <tr>
          <th>Format</th>

          {tierOrder.map((tierKey) => {
            const tier = products.inPerson.tiers[tierKey];
            if (!tier) return null;

            const isSolidarity = tier === solidarityTier.inPerson;
            const isActive = tier === inPersonActiveTier;
            const isInactive = !isSolidarity && !isActive;

            // Solidarity → no date range
            if (!tier.startDate || !tier.endDate) {
              return (
                <th
                  key={tierKey}
                  className={isInactive ? styles["inactive-tier"] : undefined}
                >
                  {tier.label}
                </th>
              );
            }

            return (
              <th
                key={tierKey}
                className={isInactive ? styles["inactive-tier"] : undefined}
              >
                {tier.label}
                <br />
                ({formatTierDates(tier.startDate, tier.endDate)})
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {Object.entries(products).map(([productKey, product]) => {
          const activeTier = productKey === "inPerson" ? inPersonActiveTier : onlineActiveTier;
          const solidarity = solidarityTier[productKey as "inPerson" | "online"];

          return (
            <tr key={product.label}>
              <td>{product.label}</td>

              {tierOrder.map((tierKey) => {
                const tier: Tier | undefined = product.tiers[tierKey];
                if (!tier) return <td key={tierKey}>—</td>;

                const isSolidarity = tier === solidarity;
                const isActive = tier === activeTier;
                const isInactive = !isSolidarity && !isActive;

                return (
                  <td
                    key={tierKey}
                    className={isInactive ? styles["inactive-tier"] : undefined}
                  >
                    {isSolidarity || isActive ? (
                      <strong>€{tier.price.toFixed(2)}</strong>
                    ) : (
                      <>€{tier.price.toFixed(2)}</>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
