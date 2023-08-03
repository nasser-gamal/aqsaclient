import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateTreasury } from '../../../utils/validation';

import { closeModal } from '../../../app/features/modal/modalSlice';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { DateInput } from '../../../utils/formatDate';
import { useCreateProviderTreasuryMutation, useUpdateProviderTreasuryMutation } from '../../../app/features/providerTreasury/providerTreasuryApi';

export default function AddEditProviderTreasury() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: childrenProps?.providerTreasury.amount || "",
    date: childrenProps?.providerTreasury.date.split('T')[0] || DateInput(),
    note: childrenProps?.providerTreasury.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createProviderTreasury, { isLoading: createLoading }] = useCreateProviderTreasuryMutation()
  const [updateProviderTreasury, { isLoading: updateLoading }] = useUpdateProviderTreasuryMutation()


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
        const response = childrenProps?.providerTreasury
          ? await updateProviderTreasury({ treasuryId: childrenProps?.providerTreasury.id, form }).unwrap()
          : await createProviderTreasury(form).unwrap();

        notify('success', response.message);
        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        type='text'
        label='القيمة'
        name={'amount'}
        value={form.amount}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='date'
        label='التاريخ'
        name={'date'}
        value={form.date}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
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
