import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';

import { validateUser } from '../../../utils/validation';
import { notify } from '../../../utils/notify';


import { closeModal } from '../../../app/features/modal/modalSlice';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateUserMutation, useUpdateUserMutation } from '../../../app/features/user/userApi';

export default function AddEditUser() {
  const { childrenProps } = useSelector(state => state.modal);


  const dispatch = useDispatch();

  const [form, setForm] = useState({
    accountName: childrenProps?.user.accountName || "",
    email: childrenProps?.user.email || "",
    userName: childrenProps?.user.userName || "",
    phoneNumber: childrenProps?.user.phoneNumber || "",
    address: childrenProps?.user.address || "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const [createUser, { isLoading: createLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();


  useEffect(() => {
    if (createLoading || updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, createLoading, updateLoading]);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = validateUser(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.user
          ? await updateUser({ userId: childrenProps?.user.id, form }).unwrap()
          : await createUser(form).unwrap();
        notify('success', response.message);

        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <CustomInput
          type='text'
          name='accountName'
          label={'اسم الحساب'}
          value={form.accountName}
          onChange={(e) => onChange(e)}
        />
        <CustomInput
          type='text'
          name='userName'
          label={'اسم صاحب الحساب'}
          value={form.userName}
          onChange={(e) => onChange(e)}
        />
        <CustomInput
          type='email'
          name='email'
          label={'البريد الالكتروني'}
          value={form.email}
          onChange={(e) => onChange(e)}
        />
        <CustomInput
          type='text'
          name='phoneNumber'
          label={'رقم الموبايل'}
          value={form.phoneNumber}
          onChange={(e) => onChange(e)}
        />
        <CustomInput
          type='text'
          name='address'
          label={'العنوان'}
          value={form.address}
          onChange={(e) => onChange(e)}
        />
        <FormButtons />
      </form>
    </div>
  )
}
