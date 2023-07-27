import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';
import {  validateFee } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import {  useUpdateBankMutation } from '../../../app/features/bank/bankApi';
import { useCreateFeeMutation } from '../../../app/features/fees/feesApi';

export default function AddEditFees() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    amount: childrenProps?.fees.amount || "",
    note: childrenProps?.fees.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createFee, { isLoading: createLoading }] = useCreateFeeMutation()
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

      const error = validateFee(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.fees
          ? await updateBank({ bankId: childrenProps?.fees.id, form }).unwrap()
          : await createFee(form).unwrap();
        notify('success', response.message);

        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      // notify('error', error.data.message);
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
