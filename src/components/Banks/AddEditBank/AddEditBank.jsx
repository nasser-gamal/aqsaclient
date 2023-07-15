import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';
import { validateBank } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateBankMutation, useUpdateBankMutation } from '../../../app/features/bank/bankApi';

export default function AddEditBank() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    bankName: childrenProps?.bank.bankName || "",
    note: childrenProps?.bank.note || ""
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
        const response = childrenProps?.bank
          ? await updateBank({ bankId: childrenProps?.bank.id, form }).unwrap()
          : await createBank(form).unwrap();
        notify('success', response.message);

        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        type='text'
        label='اسم الخدمة'
        name={'bankName'}
        value={form.bankName}
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
