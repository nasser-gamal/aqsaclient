import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useEffect, useState } from 'react';
import { useCreateBankAccountMutation, useUpdateBankAccountMutation } from '../../../app/features/bankAccount/bankAccountApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import DropDown from './DropDown';
import { validateBankAccount } from '../../../utils/validation';
import { closeModal } from '../../../app/features/modal/modalSlice';

export default function AddEditBankAccount() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    accountName: childrenProps?.bankAccount.accountName || "",
    bankNumber: childrenProps?.bankAccount.bankNumber || "",
    balance: childrenProps?.bankAccount.balance || "",
    note: childrenProps?.bankAccount.note || "",
    bankId: childrenProps?.bankAccount.bank.id || ""
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
        const response = childrenProps?.bankAccount
          ? await updateBank({ bankAccountId: childrenProps?.bankAccount.id, form }).unwrap()
          : await createBank(form).unwrap();
        notify('success', response.message);
        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }



  return (
    <form onSubmit={onSubmit}>
      <DropDown form={form} setForm={setForm} />
      <CustomInput
        type='text'
        label='اسم الحساب'
        name={'accountName'}
        value={form.accountName}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='text'
        label='رقم الحساب'
        name={'bankNumber'}
        value={form.bankNumber}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='text'
        label='الرصيد الافتتاحي'
        name={'balance'}
        value={form.balance}
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
