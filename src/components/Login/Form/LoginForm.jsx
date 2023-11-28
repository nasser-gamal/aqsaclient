
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Logo from '../../../layout/Navbar/Logo';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

import { notify } from '../../../utils/notify'

import { useLoginMutation } from '../../../app/features/auth/authApi';
import { validateLogin } from '../../../utils/validation';
import { setCredentials } from '../../../app/features/user/userSlice';
import { Button, Center, PasswordInput, Text, TextInput } from '@mantine/core';


export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    phoneNumber: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const [login, { isLoading }] = useLoginMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);





  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = validateLogin(form);
      if (error) {
        notify('error', error);
      } else {
        const { data } = await login(form).unwrap();
        console.log(data)
        dispatch(setCredentials({ ...data }));
        if (data.role.name == 'agent') {
          navigate("/agent/commissions");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error)
      notify('error', error.data.message);
    }
  }



  return (
    <>
      <div className="login">
        <div className="login-content ">
          <Logo />
          {/* <h2>تسجيل الدخول</h2> */}
          <form onSubmit={onSubmit}>
            <TextInput m={'10 0'}
              p={'10 0'}
              type="text"
              name="phoneNumber"
              label="رقم الموبايل"
              placeholder="رقم الموبايل"
              value={form.phoneNumber}
              onChange={(e) => handleChange(e)}
            />

            <div className="input-pass">
              <PasswordInput
                p={'10 0'}
                name="password"
                label="الرقم السري "
                placeholder="الرقم السري"
                passIcon={true}
                value={form.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <Center>
              <Button type="submit" m={'20 0'} >
                <Text size={'14'}>
                  تسجيل الدخول
                </Text>
              </Button>
            </Center>
          </form>
        </div>
      </div>
    </>
  )
}
