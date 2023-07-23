import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../../common/FormFields/input/CustomInput';
import FormButtons from '../../../UI/FormButtons/FormButtons';
import ReciverSelect from './ReciverSelect';


import { useFindAllBankAccountsQuery } from '../../../../app/features/bankAccount/bankAccountApi';
import { showLoader, hideLoader } from '../../../../app/features/loader/loaderSlice';
import SenderSelect from './SenderSelect';
import { notify } from '../../../../utils/notify';
import { useCreateTransferMutation, useUpdateTransferMutation } from '../../../../app/features/transaction/transferApi';
import { validateTransfer } from '../../../../utils/validation';
import { closeModal } from '../../../../app/features/modal/modalSlice';

export default function AddEditDeposit() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    senderId: childrenProps?.transfer.senderId || "",
    amountTotal: childrenProps?.transfer.amountTotal || "",
    recipientId: childrenProps?.transfer.recipientId || "",
    note: childrenProps?.transfer.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  };



  const [createSegment, { isLoading: createLoading }] = useCreateTransferMutation();
  const [updateSegment, { isLoading: updateLoading }] = useUpdateTransferMutation();


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
      const error = validateTransfer(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.transfer
          ? await updateSegment({ transactionId: childrenProps?.transfer.id, form }).unwrap()
          : await createSegment(form).unwrap();
        notify('success', response.message);
        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }



  const { data, isLoading } = useFindAllBankAccountsQuery({ page: 1, limit: 100000000000, order: 'createdAt', sort: "ASC" });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div >
          <SenderSelect
            bankAccounts={data?.bankAccounts}
            form={form}
            setForm={setForm}
            disabled={childrenProps?.transfer ? true : false}
          />
          <ReciverSelect
            bankAccounts={data?.bankAccounts}
            form={form}
            setForm={setForm}
            disabled={childrenProps?.transfer ? true : false}
          />
          <CustomInput
            type='text'
            name='amountTotal'
            label='القيمة'
            value={form.amountTotal}
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            type='textarea'
            name='note'
            label='ملحوظة'
            value={form.note}
            onChange={(e) => onChange(e)}
          />
        </div>
        <FormButtons />
      </form>

    </div>
  )
}
