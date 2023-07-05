
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import CustomButton from '../../common/Button/CustomButton';
import Logo from '../../../layout/Navbar/Logo';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

import { notify } from '../../../utils/notify'

import { useLoginMutation } from '../../../app/features/auth/authApi';
import { validateLogin } from '../../../utils/validation';
import { setCredentials } from '../../../app/features/user/userSlice';


export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    phoneNumber: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
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
        const userData = await login(form).unwrap();
        dispatch(setCredentials({ ...userData }));
        console.log('userData', userData);
        if (userData.user.role.name == 'agent') {
          navigate("/agent/commissions");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
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
            <CustomInput
              type="text"
              name="phoneNumber"
              label="رقم الموبايل"
              placeholder="رقم الموبايل"
              value={form.phoneNumber}
              onChange={(e) => handleChange(e)}
            />

            <div className="input-pass">
              <CustomInput
                type={"text"}
                name="password"
                label="الرقم السري "
                placeholder="الرقم السري"
                passIcon={true}
                value={form.password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='text-center'>
              <CustomButton type="submit" classes={'add-btn'} width='110px' height='38px' margin='20px 0'>
                تسجيل الدخول
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
