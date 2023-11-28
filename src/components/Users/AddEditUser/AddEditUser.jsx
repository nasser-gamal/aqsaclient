/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';

import FormButtons from '../../UI/FormButtons/FormButtons';

import { validateUser } from '../../../utils/validation';
import { notify } from '../../../utils/notify';


import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateUserMutation, useUpdateUserMutation } from '../../../app/features/user/userApi';
import { modals } from '@mantine/modals';
import { TextInput } from '@mantine/core';

export default function AddEditUser({ innerProps }) {


  const dispatch = useDispatch();

  const [form, setForm] = useState({
    accountName: innerProps?.data?.accountName || "",
    email: innerProps?.data?.email || "",
    userName: innerProps?.data?.userName || "",
    phoneNumber: innerProps?.data?.phoneNumber || "",
    nationalId: innerProps?.data?.nationalId || "",
    address: innerProps?.data?.address || "",
    roleId: innerProps?.data?.roleId || innerProps?.roleId,
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
        const response = innerProps?.data
          ? await updateUser({ userId: innerProps?.data?.id, form }).unwrap()
          : await createUser(form).unwrap();
        notify('success', response.message);

        modals.closeAll();

      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput m={'10 0'}
          type='text'
          name='accountName'
          label={'اسم الحساب'}
          value={form.accountName}
          onChange={(e) => onChange(e)}
        />
        <TextInput m={'10 0'}
          type='text'
          name='userName'
          label={'اسم صاحب الحساب'}
          value={form.userName}
          onChange={(e) => onChange(e)}
        />
        <TextInput m={'10 0'}
          type='email'
          name='email'
          label={'البريد الالكتروني'}
          value={form.email}
          onChange={(e) => onChange(e)}
        />
        <TextInput m={'10 0'}
          type='text'
          name='phoneNumber'
          label={'رقم الموبايل'}
          value={form.phoneNumber}
          onChange={(e) => onChange(e)}
        />
        <TextInput m={'10 0'}
          type='text'
          name='nationalId'
          label={'الرقم القومي'}
          value={form.nationalId}
          onChange={(e) => onChange(e)}
        />
        <TextInput m={'10 0'}
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
