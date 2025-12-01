"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./newsletterform.module.css";
import Button from "../../shared/Button";

type FormValues = {
  email: string;
};

// TODO if there's time, successMessage and errorMessage can be passed as props too
export function NewsletterForm({
  buttonLabel = "Subscribe",
  successMessage = "Thanks! You’re almost subscribed. Please check your inbox to confirm your subscription (and your spam folder just in case).",
  errorMessage = "Something went wrong. Please try again."
}: {
  buttonLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setStatus("success");
      reset();
      // TODO assert type of error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["form-newsletter-inputs"]}>
        <input
        className={styles["input-field-newsletter"]}
        type="email"
        id="email"
        required
        {...register("email")}
      />
      <Button type="submit"><strong>{buttonLabel}</strong></Button>
      </div>
      {status === "success" && <p className={styles["success-message"]}><em>{successMessage}</em></p>}
      {status === "error" && <p className={styles["error-message"]}><em>{errorMessage}</em></p>}
    </form>
  );
}
