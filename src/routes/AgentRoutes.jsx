import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import AgentNav from '../components/AgentCommission/Nav/AgentNav';

export default function AgentRoute() {

  const { user } = useSelector((state) => state.user);

  console.log(user)
  return user && user?.role?.name == 'agent' ? (
    <>
      <AgentNav />
      <React.Suspense>
        <Outlet />
      </React.Suspense>
    </>
  ) : (

    <Navigate to="/login" replace />
  );
}
