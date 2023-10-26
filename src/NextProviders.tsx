import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function ProvidersNext({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
