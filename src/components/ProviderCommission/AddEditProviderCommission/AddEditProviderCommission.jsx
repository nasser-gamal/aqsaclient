/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';

import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateProviderCommission } from '../../../utils/validation';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { getCurrentDateTime } from '../../../utils/formatDate';
import { useCreateProviderCommissionMutation, useUpdateProviderCommissionMutation } from '../../../app/features/provider/providerCommissions';
import ProviderSelect from './ProviderSelect';
import { TextInput } from '@mantine/core';

export default function AddEditProviderCommission({ context, id, innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    providerId: innerProps?.data?.provider.id || "",
    commission: innerProps?.data?.commission || "",
    date: innerProps?.data?.date.split('T')[0] || getCurrentDateTime(),
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createProviderCommission, { isLoading: createLoading }] = useCreateProviderCommissionMutation()
  const [updateProviderCommission, { isLoading: updateLoading }] = useUpdateProviderCommissionMutation()


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
      const error = validateProviderCommission(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateProviderCommission({ providerCommissionId: innerProps?.data.id, form }).unwrap()
          : await createProviderCommission(form).unwrap();
        notify('success', response.message);
        context.closeModal(id)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <ProviderSelect
        form={form}
        setForm={setForm}
        value={innerProps?.data?.provider ? { label: innerProps?.data?.provider.name, value: innerProps?.data?.provider.id } : ''}
      />
      <TextInput m={'10 0'}
        type='text'
        label='العمولة'
        name={'commission'}
        value={form.commission}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='date'
        label='التاريخ'
        name={'date'}
        value={form.date}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='text'
        label='محلوظة'
        name={'note'}
        value={form.note}
        onChange={(e) => onChange(e)}
      />
      <FormButtons />
    </form>
  )
}
