/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useEffect, useState } from 'react';
import { useCreateBankAccountMutation, useUpdateBankAccountMutation } from '../../../app/features/bankAccount/bankAccountApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import DropDown from './DropDown';
import { validateBankAccount } from '../../../utils/validation';
import { TextInput } from '@mantine/core';
import { modals } from '@mantine/modals';

export default function AddEditBankAccount({ innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    accountName: innerProps?.data?.accountName || "",
    bankNumber: innerProps?.data?.bankNumber || "",
    balance: innerProps?.data?.balance || "",
    note: innerProps?.data?.note || "",
    bankId: innerProps?.data?.bank?.id || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createBank, { isLoading: createLoading }] = useCreateBankAccountMutation()
  const [updateBank, { isLoading: updateLoading }] = useUpdateBankAccountMutation()


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

      const error = validateBankAccount(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateBank({ bankAccountId: innerProps?.data?.id, form }).unwrap()
          : await createBank(form).unwrap();
        notify('success', response.message);
        modals.closeAll();
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <DropDown
        form={form}
        setForm={setForm}
        disabled={innerProps?.data}
        defaultValue={innerProps?.data ? innerProps?.data?.bank?.bankName : ''}
      />
      <TextInput m={'10 0'}
        type='text'
        label='اسم الحساب'
        name={'accountName'}
        value={form.accountName}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='text'
        label='رقم الحساب'
        name={'bankNumber'}
        value={form.bankNumber}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='number'
        label='الرصيد الافتتاحي'
        name={'balance'}
        value={form.balance}
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
