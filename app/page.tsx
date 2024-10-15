import React, { Suspense, lazy } from "react";
import Loading from "./components/loading";

const Home = lazy(() => import("./components/Home"));

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}
