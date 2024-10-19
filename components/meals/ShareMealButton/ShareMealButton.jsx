"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export const ShareMealButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
};

export default ShareMealButton;
