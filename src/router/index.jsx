import React from 'react';


const AdminPage = React.lazy(() => import('../page/Admin/AdminPage'));

export const router = [
  {
    Path:'/admin',
    Component:AdminPage,
  },
  
]