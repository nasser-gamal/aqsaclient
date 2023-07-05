import { useEffect } from 'react'


import { adminMenu } from '../../../utils/sidebarMenu'
import { notify } from '../../../utils/notify';

import SidebarLink from './SidebarLink'
import SidebarTitle from './SidebarTitle'

import { useDispatch, useSelector } from 'react-redux';
import { toggleListMenu } from '../../../app/features/sidebar/sidebarSlice';
import { logOut } from '../../../app/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../app/features/auth/authApi';

import { showLoader, hideLoader } from '../../../app/features/loader/loaderSlice';

export default function SidebarMenu() {
  let id = localStorage.getItem('showList')

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { listId } = useSelector(state => state.sidebar);

  useEffect(() => {
    if (id) {
      dispatch(toggleListMenu({ listId: id }))
    }
  }, [dispatch, id]);

  const handleShowList = (id) => {
    if (id == listId) {
      dispatch(toggleListMenu({ listId: null }))
    } else {
      dispatch(toggleListMenu({ listId: id }))
    }
    localStorage.setItem('showList', id)
  }


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
    <div className='right-serv'>
      {adminMenu.map(menu => {
        return (<div key={menu.id}>
          <SidebarTitle
            title={menu.title}
            imgSrc={menu.imgSrc}
            onClick={() => handleShowList(menu.id)}
            active={listId == menu.id}
          />
          {
            listId == menu.id &&
            <div className='sublinks'>
              {menu.subMenu.map((subMenu) => {
                return (
                  <ul key={subMenu.id}>
                    <li>
                      <SidebarLink
                        url={subMenu.linkURL}
                        imgSrc={subMenu.imgSrc}
                        title={subMenu.title}
                      />
                    </li>
                  </ul>
                )
              })}
            </div>
          }
        </div>)
      })}

      <div className='log-out text-center' onClick={signOut}>
        <span>
          تسجيل خروج
        </span>
      </div>

    </div >
  )
}
