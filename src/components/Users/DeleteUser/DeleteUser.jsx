/* eslint-disable react/prop-types */
import { useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDeleteUserMutation, } from '../../../app/features/user/userApi';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { validatePassword } from '../../../utils/validation';
import { Center, Modal, PasswordInput, Text } from '@mantine/core';


export default function DeleteUser({ title, opened, close, id }) {
  const dispatch = useDispatch();

  const [password, setPassword] = useState();


  const [deleteUser] = useDeleteUserMutation()


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoader())
      const error = validatePassword(password);
      if (error) {
        notify('error', error)
      } else {
        const response = await deleteUser({ id, password }).unwrap();
        notify('success', response.message);
        // context.closeModal(id)
      }
      close()
      dispatch(hideLoader())
    } catch (err) {
      dispatch(hideLoader())
      notify('error', err.data.message)
    }
  }


  return (
    <Modal opened={opened} onClose={close} title={title} centered>
      <form onSubmit={onSubmit}>
        <Center m={'20 0'}>
          <Text>
            لتأكيد الحذف ادخل الرقم السري الخاص بك
          </Text>
        </Center>
        <PasswordInput
          m={'10 0'}
          type='password'
          name='password'
          placeholder={'ادخل الرقم السري الخاص بالادمن'}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButtons close={close} />
      </form>
    </Modal>
  )
}
