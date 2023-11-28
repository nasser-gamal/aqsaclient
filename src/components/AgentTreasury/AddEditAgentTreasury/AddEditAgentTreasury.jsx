/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';

import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateTreasury } from '../../../utils/validation';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateAgentTreasuryMutation, useUpdateAgentTreasuryMutation } from '../../../app/features/agentTreasury/agentTreasuryApi';
import { DateInput } from '../../../utils/formatDate';
import { TextInput } from '@mantine/core';

export default function AddEditAgentTreasury({ context, id, innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: innerProps?.data.amount || "",
    date: innerProps?.data.date.split('T')[0] || DateInput(),
    note: innerProps?.data.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createAgentTreasury, { isLoading: createLoading }] = useCreateAgentTreasuryMutation()
  const [updateAgentTreasury, { isLoading: updateLoading }] = useUpdateAgentTreasuryMutation()


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
      const error = validateTreasury(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateAgentTreasury({ treasuryId: innerProps?.data.id, form }).unwrap()
          : await createAgentTreasury(form).unwrap();

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
        type='number'
        label='القيمة'
        name={'amount'}
        value={form.amount}
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
