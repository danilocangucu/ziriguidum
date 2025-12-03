import { formatTierDates, onlineActiveTier, products, tierOrder } from "@/app/utils/productsUtils";
import styles from "./bigtable.module.css";
import { Tier } from "@/app/types/products";
import { inPersonActiveTier, solidarityTier } from "@/app/utils/productsUtils";
import React from "react";
import SignUpRouteButton from "../../shared/SignUpRouteButton";

export default function BigTable() {
  return (
    <>
    <table className={styles["big-table"]}>
      <thead>
        <tr>
          <th>Format</th>
            <th>Package</th>

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
          const activeTier =
            productKey === "inPerson" ? inPersonActiveTier : onlineActiveTier;
          const solidarity = solidarityTier[productKey as "inPerson" | "online"];

          return (
            <React.Fragment key={product.label}>
              {/* --- Row 1: 4 sessions --- */}
              <tr>
                {/* Merge the Format cell over 2 rows */}
                <td rowSpan={2} className={styles["format-cell"]}>
                  {product.label}
                </td>

                {/* Sessions label */}
                <td><small>1 session</small></td>

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
                        <strong>€{tier.prices.oneSession.toFixed(2)}</strong>
                      ) : (
                        <>€{tier.prices.oneSession.toFixed(2)}</>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* --- Row 2: 1 session --- */}
              <tr>
                <td><small>4 sessions</small></td>

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
                        <strong>€{tier.prices.fourSessions.toFixed(2)}</strong>
                      ) : (
                        <>€{tier.prices.fourSessions.toFixed(2)}</>
                      )}
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
      <SignUpRouteButton className={styles["big-table-button"]} />
    </>
  );
}
