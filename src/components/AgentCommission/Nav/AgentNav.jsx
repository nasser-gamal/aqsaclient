import Logo from '../../../layout/Navbar/Logo'
import Profile from '../../../layout/Navbar/Profile'

import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../../app/features/user/userSlice';
import { useLogoutMutation } from '../../../app/features/auth/authApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';

export default function AgentNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [logout, { isLoading }] = useLogoutMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())

    }
  }, [isLoading, dispatch])

  const signOut = async () => {
    try {
      await logout().unwrap()
      navigate('/login')
      dispatch(logOut());
    } catch (err) {
      notify('error', err.data.message)
    }
  }


  return (
    <div className='agent-nav d-flex flex-between'>
      <Logo />
      <Profile />
      <div className='agent-nav-links'>
        <ul>
          <li>
            <NavLink to='/agent/commissions' className={'text-white'}>العمولة</NavLink>
          </li>
          <li>
            <NavLink to='/agent/segments' className={'text-white'}>الشرائح</NavLink>
          </li>
          <li>
            <span className='text-white log-out' onClick={signOut}>تسجيل خروج</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
