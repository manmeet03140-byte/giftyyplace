"use client";

import React from "react";
import { CartProvider as BaseCartProvider } from "./cart-store";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <BaseCartProvider>{children}</BaseCartProvider>;
}
