import Logo from '../../../layout/Navbar/Logo'

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../../app/features/user/userSlice';
import { useLogoutMutation } from '../../../app/features/auth/authApi';
import { useEffect, useRef, useState } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { MdAccountCircle } from "react-icons/md";


export default function AgentNav() {
  const { user } = useSelector(state => state.user);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAcc, setShowAcc] = useState();
  const menuRef = useRef(null);



  // handle ClickOutSide 
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShowAcc(false);
      }
    });
  }, []);

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
      <div className='agent-nav-links'>
        <ul>
          <li>
            <NavLink to='/agent/commissions' className={'text-white'}>العمولة</NavLink>
          </li>
          <li>
            <NavLink to='/agent/segments' className={'text-white'}>الشرائح</NavLink>
          </li>
        </ul>
      </div>
      <div className="account acc" ref={menuRef}>
        <span className='d-flex' onClick={() => setShowAcc(!showAcc)}>
          <MdAccountCircle />
        </span>
        <ul className={showAcc ? "account-info show" : "account-info"}>
          <li>{user.accountName}</li>
          <li>رقم الحساب : {user.accountNumber}</li>
          <li className='log-out text-center' onClick={signOut}>
            <span className='text-white' >تسجيل خروج</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
