import { products, tierOrder, formatTierDates, inPersonActiveTier, onlineActiveTier, solidarityTier } from "@/app/utils/products";
import { Tier } from "@/app/types/products";
import styles from "./smalltable.module.css";

export default function SmallTables() {
  return (
    <div className={styles["small-tables-container"]}>
      {Object.entries(products).map(([productKey, product]) => {
        const activeTier = productKey === "inPerson" ? inPersonActiveTier : onlineActiveTier;
        const solidarity = solidarityTier[productKey as "inPerson" | "online"];

        return (
          <table key={product.label} className={styles["small-table"]}>
            <thead>
              <tr>
                <th colSpan={2}>{product.label}</th>
              </tr>
            </thead>
            <tbody>
              {tierOrder.map((tierKey) => {
                const tier: Tier | undefined = product.tiers[tierKey];
                if (!tier) return null;

                const isSolidarity = tier === solidarity;
                const isActive = tier === activeTier;

                return (
                  <tr key={tierKey}>
                    <td className={!isSolidarity && !isActive ? styles["inactive-tier"] : undefined}>
                      {isSolidarity || isActive ? (
                        <>
                          <strong>{tier.label}
                          {tier.startDate && tier.endDate && (
                            <>
                              <br />
                              ({formatTierDates(tier.startDate, tier.endDate)})
                            </>
                          )}
                          </strong>
                        </>
                      ) : (
                        <>
                          {tier.label}
                          {tier.startDate && tier.endDate && (
                            <>
                              <br />
                              ({formatTierDates(tier.startDate, tier.endDate)})
                            </>
                          )}
                        </>
                      )}
                    </td>
                    <td className={!isSolidarity && !isActive ? styles["inactive-tier"] : undefined}>
                      {isSolidarity || isActive ? <strong>€{tier.price}</strong> : <>€{tier.price.toFixed(2)}</>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}