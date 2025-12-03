"use client";

import { products, tierOrder, formatTierDates, inPersonActiveTier, onlineActiveTier, solidarityTier } from "@/app/utils/productsUtils";
import { Tier } from "@/app/types/products";
import styles from "./smalltable.module.css";
import React, { useState } from "react";
import Button from "../../shared/Button";
import PricingButton from "../../shared/SignUpRouteButton";

export default function SmallTables() {
  const [showInactivePrices, setShowInactivePrices] = useState<Record<string, boolean>>({});

  return (
    <div className={styles["small-tables-container"]}>
      {Object.entries(products).map(([productKey, product]) => {
        const activeTier = productKey === "inPerson" ? inPersonActiveTier : onlineActiveTier;
        const solidarity = solidarityTier[productKey as "inPerson" | "online"];

        // Split tiers into active + inactive
        const activeTiers = tierOrder.filter((tierKey) => {
          const tier = product.tiers[tierKey];
          return tier && (tier === activeTier || tier === solidarity);
        });

        const inactiveTiers = tierOrder.filter((tierKey) => {
          const tier = product.tiers[tierKey];
          return tier && tier !== activeTier && tier !== solidarity;
        });

        // State to show/hide inactive tiers
        const isExpanded = !!showInactivePrices[productKey];

        return (
          <div className={styles["small-table-container"]} key={product.label}>
          <table key={product.label} className={styles["small-table"]}>
            <thead>
              <tr>
                <th colSpan={2}>{product.label}</th>
              </tr>
            </thead>
            <tbody>
                {/* Active tiers */}
                {activeTiers.map((tierKey) => {
                  const tier: Tier = product.tiers[tierKey]!;
                return (
                  <React.Fragment key={tierKey}>
                    <tr>
                      <td colSpan={2}>
                        <strong>
                          {tier.label}
                          {tier.startDate && tier.endDate && (
                            <>
                              <br />
                              ({formatTierDates(tier.startDate, tier.endDate)})
                            </>
                          )}
                        </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>1 session</td>
                        <td>
                          <strong>€{tier.prices.oneSession.toFixed(2)}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>4 sessions</td>
                        <td>
                          <strong>€{tier.prices.fourSessions.toFixed(2)}</strong>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}

                {/* Toggle button row */}
                {inactiveTiers.length > 0 && (
                  <tr>
                    <td colSpan={2}>
                      <Button
                        type="button"
                        onClick={() =>
                          setShowInactivePrices(prev => ({
                            ...prev,
                            [productKey]: !prev[productKey],
                          }))
                        }                    >
                        {isExpanded ? "Hide upcoming prices" : "Show upcoming prices"}
                      </Button>
                    </td>
                  </tr>
                )}

                {/* Inactive tiers */}
                {isExpanded &&
                  inactiveTiers.map((tierKey) => {
                    const tier: Tier = product.tiers[tierKey]!;
                    return (
                      <React.Fragment key={tierKey}>
                        <tr>
                          <td colSpan={2}>
                            {tier.label}
                            {tier.startDate && tier.endDate && (
                              <>
                                <br />
                                ({formatTierDates(tier.startDate, tier.endDate)})
                              </>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>1 session</td>
                          <td>€{tier.prices.oneSession.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>4 sessions</td>
                          <td>€{tier.prices.fourSessions.toFixed(2)}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
            </tbody>
          </table>
            <PricingButton className="margin-top-xs" />
          </div>
        );
      })}
    </div>
  );
}
