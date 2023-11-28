import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ForceRedirect = () => {
  const { user } = useSelector((state) => state.user);

  console.log(user)
  if (user) {
    if (user?.role.name == 'agent') {
      return <Navigate to="/agent/commissions" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ForceRedirect;
