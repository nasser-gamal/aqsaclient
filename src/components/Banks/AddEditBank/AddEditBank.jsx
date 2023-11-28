/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDispatch, } from 'react-redux';
import { notify } from '../../../utils/notify';
import { validateBank } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateBankMutation, useUpdateBankMutation } from '../../../app/features/bank/bankApi';
import { TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';

export default function AddEditBank({ innerProps }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    bankName: innerProps?.data?.bankName || "",
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createBank, { isLoading: createLoading }] = useCreateBankMutation()
  const [updateBank, { isLoading: updateLoading }] = useUpdateBankMutation()


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

      const error = validateBank(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateBank({ bankId: innerProps?.data?.id, form }).unwrap()
          : await createBank(form).unwrap();
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
        type='text'
        label='اسم الخدمة'
        name={'bankName'}
        value={form.bankName}
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
