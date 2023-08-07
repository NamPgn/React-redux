import React, { Suspense } from 'react'
import { Loading } from '../Message/Loading';

const LazyComponent = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
  </Suspense>
);

export default LazyComponent