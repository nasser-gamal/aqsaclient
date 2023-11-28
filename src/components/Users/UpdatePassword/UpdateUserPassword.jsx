/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useUpdatePasswordMutation } from '../../../app/features/user/userApi';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { validatePassword } from '../../../utils/validation';
import { modals } from '@mantine/modals';
import { PasswordInput } from '@mantine/core';


export default function UpdateUserPassword({ innerProps }) {
  const dispatch = useDispatch();

  const [password, setPassword] = useState();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();


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
        modals.closeAll()
      }
    } catch (err) {
      notify('error', err.data.message)
    }
  }


  return (
    <>
      <form onSubmit={onSubmit}>
        <PasswordInput
          type='password'
          name='password'
          placeholder={'ادخل الرقم السري الخاص بالادمن'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons />
      </form>
    </>
  )
}
