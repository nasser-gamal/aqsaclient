import Logo from '../../../layout/Navbar/Logo'

import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../../app/features/user/userSlice';
import { useLogoutMutation } from '../../../app/features/auth/authApi';
import { useEffect, useRef, useState } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { MdAccountCircle } from "react-icons/md";
import { Avatar, Center, Flex, Group, Indicator, List, Menu, Text } from '@mantine/core';


export default function AgentNav() {
  const { user } = useSelector(state => state.user);
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
    <Flex justify={'space-between'} align={'center'} className='agent-nav'>
      <Logo />
      <div className='agent-nav-links'>
        <List listStyleType='none'>
          <List.Item>
            <NavLink to='/agent/commissions' className={'text-white'}>العمولة</NavLink>
          </List.Item>
          <List.Item>
            <NavLink to='/agent/segments' className={'text-white'}>الشرائح</NavLink>
          </List.Item>
        </List>
      </div>
      <Group gap={8}>
        <Text c={'white'}>
          {user.accountName}
        </Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Indicator style={{ cursor: 'pointer' }} disabled={true} size={16} offset={7} position="bottom-end" color="red" withBorder>
              <Avatar
                size="md"
                radius="xl"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
              // onClick={() => setShowAcc(!showAcc)}
              />
            </Indicator>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item style={{ pointerEvents: 'none' }} >
              <Group gap={10}>
                <Text size='sm'>
                  الاسم
                </Text>
                <Text fw={'bold'} c='red'>
                  {user.userName}
                </Text>
              </Group>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item style={{ pointerEvents: 'none' }} >
              <Group gap={10}>
                <Text size='sm'>
                  الحساب
                </Text>
                <Text fw={'bold'} c='red'>
                  {user.accountNumber}
                </Text>
              </Group>
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item
              onClick={signOut}
            // leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
            >
              تسجيل خروج
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  )
}
