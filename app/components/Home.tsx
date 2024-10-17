"use client";

import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LandingPage from "./LandingPage";

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <ErrorBoundary>
      <LandingPage setIsNavbarVisible={setIsNavbarVisible} />
    </ErrorBoundary>
  );
}