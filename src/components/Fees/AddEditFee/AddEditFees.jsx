/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateFee } from '../../../utils/validation';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateFeeMutation, useUpdateFeeMutation } from '../../../app/features/fees/feesApi';
import { DateInput } from '../../../utils/formatDate';
import { modals } from '@mantine/modals';
import { TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

export default function AddEditFees({ innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: innerProps?.data.amount || "",
    date: innerProps?.data.date.split("T")[0] || DateInput(),
    note: innerProps?.data.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createFee, { isLoading: createLoading }] = useCreateFeeMutation()
  const [updateFee, { isLoading: updateLoading }] = useUpdateFeeMutation()


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
      const error = validateFee(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateFee({ feesId: innerProps?.data.id, form }).unwrap()
          : await createFee(form).unwrap();
        notify('success', response.message);
        modals.closeAll()
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
      {/*  <TextInput  m={'10 0'}
        type='date'
        label='التاريخ'
        name={'date'}
        value={form.date}
        onChange={(e) => onChange(e)}
      /> */}
      <DateTimePicker
        w={'100%'}
        clearable
        name={'date'}
        value={new Date() || form.date}
        label="التاريخ والوقت"
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
