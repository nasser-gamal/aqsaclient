import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateFee } from '../../../utils/validation';

import { closeModal } from '../../../app/features/modal/modalSlice';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateFeeMutation, useUpdateFeeMutation } from '../../../app/features/fees/feesApi';
import { DateInput } from '../../../utils/formatDate';

export default function AddEditFees() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: childrenProps?.fee.amount || "",
    date: childrenProps?.fee.date.split("T")[0] || DateInput(),
    note: childrenProps?.fee.note || ""
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
        const response = childrenProps?.fee
          ? await updateFee({ feesId: childrenProps?.fee.id, form }).unwrap()
          : await createFee(form).unwrap();

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
