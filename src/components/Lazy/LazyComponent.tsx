import React, { Suspense, lazy } from 'react'

const LazyComponent = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent