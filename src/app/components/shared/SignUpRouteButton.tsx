"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import styles from "./button.module.css"

export default function PricingButton() {
  const router = useRouter();

  return (
    <div className={styles.container}>
    <Button
      type="button"
      onClick={() => router.push("/sign-up")}
    >
      <strong>Sign up</strong>
    </Button>
    </div>
  );
}
