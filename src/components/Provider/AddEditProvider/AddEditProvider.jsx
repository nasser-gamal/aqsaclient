/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '@mantine/core';


import FormButtons from '../../UI/FormButtons/FormButtons';
import { notify } from '../../../utils/notify';
import { validateProvider } from '../../../utils/validation';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateProviderMutation, useUpdateProviderMutation } from '../../../app/features/provider/providerApi';

export default function AddEditProvider({ context, id, innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: innerProps?.data.name || "",
    note: innerProps?.data.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createProvider, { isLoading: createLoading }] = useCreateProviderMutation()
  const [updateProvider, { isLoading: updateLoading }] = useUpdateProviderMutation()


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
      const error = validateProvider(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateProvider({ providerId: innerProps?.data.id, form }).unwrap()
          : await createProvider(form).unwrap();

        notify('success', response.message);
        context.closeModal(id)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextInput m={'10 0'}
        type='text'
        label='اسم المزود'
        name={'name'}
        value={form.name}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='textarea'
        label='محلوظة'
        name={'note'}
        value={form.note}
        onChange={(e) => onChange(e)}
      />
      <FormButtons />
    </form>
  )
}
