import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

export default function PrivateRoute() {

  const {  user } = useSelector((state) => state.user);

  return user &&  user?.role.name == 'superAdmin' || user?.role.name == 'admin' ? (
    <>
      <Navbar />
      <Sidebar />
      <React.Suspense >
        <Outlet />
      </React.Suspense>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
