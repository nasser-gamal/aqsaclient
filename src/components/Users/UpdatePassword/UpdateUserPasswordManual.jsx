/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useUpdatePasswordManualMutation } from '../../../app/features/user/userApi';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { validatePassword } from '../../../utils/validation';
import { PasswordInput } from '@mantine/core';
import { modals } from '@mantine/modals';


export default function UpdateUserPasswordManual({ innerProps }) {
  const dispatch = useDispatch();

  const [password, setPassword] = useState();

  const [updatePassword, { isLoading }] = useUpdatePasswordManualMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const error = validatePassword(password);
      if (error) {
        notify('error', error)
      } else {
        const response = await
          updatePassword(
            { userId: innerProps.id, password }
          ).unwrap();
        notify('success', response.message);
        modals.closeAll();
      }
    } catch (err) {
      notify('error', err.data.message)
    }
  }


  return (
    <>
      <form onSubmit={onSubmit}>
        <PasswordInput
          mt={15}
          type='password'
          name='password'
          placeholder={'ادخل الرقم السري الجديد للحساب'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons />
      </form>
    </>
  )
}
