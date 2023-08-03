import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { DateInput } from '../../../utils/formatDate';
import { validateTreasury } from '../../../utils/validation';

import { closeModal } from '../../../app/features/modal/modalSlice';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateAddionalTreasuryMutation, useUpdateAddionalTreasuryMutation } from '../../../app/features/addionalTreasury/addionalTreasuryApi';



export default function AddEditAddionalTreasury() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: childrenProps?.addionalTreasury.amount || "",
    date: childrenProps?.addionalTreasury.date.split('T')[0] || DateInput(),
    note: childrenProps?.addionalTreasury.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createAddionalTreasury, { isLoading: createLoading }] = useCreateAddionalTreasuryMutation()
  const [updateAddionalTreasury, { isLoading: updateLoading }] = useUpdateAddionalTreasuryMutation()


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
        const response = childrenProps?.addionalTreasury
          ? await updateAddionalTreasury({ treasuryId: childrenProps?.addionalTreasury.id, form }).unwrap()
          : await createAddionalTreasury(form).unwrap();

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
