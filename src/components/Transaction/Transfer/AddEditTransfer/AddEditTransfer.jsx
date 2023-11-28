/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';
import FormButtons from '../../../UI/FormButtons/FormButtons';
import ReciverSelect from './ReciverSelect';


import { useFindAllBankAccountsQuery } from '../../../../app/features/bankAccount/bankAccountApi';
import { showLoader, hideLoader } from '../../../../app/features/loader/loaderSlice';
import SenderSelect from './SenderSelect';
import { notify } from '../../../../utils/notify';
import { useCreateTransferMutation, useUpdateTransferMutation } from '../../../../app/features/transaction/transferApi';
import { validateTransfer } from '../../../../utils/validation';
import { TextInput } from '@mantine/core';

export default function AddEditDeposit({ context, id, innerProps }) {
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    senderId: innerProps?.data.id || innerProps?.data?.senderId || "",
    amountTotal: innerProps?.data?.amountTotal || "",
    recipientId: innerProps?.data?.recipientId || "",
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  };


  const [createSegment] = useCreateTransferMutation();
  const [updateSegment] = useUpdateTransferMutation();


  // useEffect(() => {
  //   if (createLoading || updateLoading) {
  //     dispatch(showLoader())
  //   } else {
  //     dispatch(hideLoader())
  //   }
  // }, [dispatch, createLoading, updateLoading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoader())
      const error = validateTransfer(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.status === 'edit'
          ? await updateSegment({ transactionId: innerProps?.data.id, form }).unwrap()
          : await createSegment(form).unwrap();
        notify('success', response.message);
        context.closeModal(id)
      }
      dispatch(hideLoader())
    } catch (error) {
      dispatch(hideLoader())
      notify('error', error.data.message);
    }
  }

  const { data, isLoading } = useFindAllBankAccountsQuery({ limit: 10000 });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])
  console.log(innerProps)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          {innerProps?.data || innerProps?.show ?
            <TextInput m={'10 0'}
              w={'100%'}
              type='text'
              name='bankAccountId'
              label='الحساب'
              value={innerProps?.data?.sender?.accountName || innerProps?.data?.accountName}
              onChange={(e) => onChange(e)}
              disabled={innerProps?.show || innerProps?.data}
            />
            :
            <SenderSelect
              data={data?.data}
              form={form}
              setForm={setForm}
              disabled={innerProps?.data ? true : false}
            />
          }
          <ReciverSelect
            data={data?.data}
            form={form}
            setForm={setForm}
            disabled={innerProps?.data?.recipient ? true : false}
            defaultValue={innerProps?.data?.recipient?.accountName}
          />
          <TextInput m={'10 0'}
            type='number'
            name='amountTotal'
            label='القيمة'
            value={form.amountTotal}
            onChange={(e) => onChange(e)}
          />
          <TextInput m={'10 0'}
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
