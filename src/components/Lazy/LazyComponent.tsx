import React, { Suspense } from "react";
import { Loading } from "../Message/Notification";

const LazyComponent = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export default LazyComponent;
