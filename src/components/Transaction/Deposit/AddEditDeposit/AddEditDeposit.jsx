import { useEffect, useState } from 'react';
import CustomInput from '../../../common/FormFields/input/CustomInput';
import FormButtons from '../../../UI/FormButtons/FormButtons';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateDepositeMutation, useUpdateDepositeMutation } from '../../../../app/features/transaction/depositeApi';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { closeModal } from '../../../../app/features/modal/modalSlice';
import { validateDeposite } from '../../../../utils/validation';
import { notify } from '../../../../utils/notify';


export default function AddEditDeposit() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [balance, setBalance] = useState({
    before: childrenProps?.transaction?.balanceBefore || "",
    after: childrenProps?.transaction?.balanceAfter || ""
  });


  const [form, setForm] = useState({
    date: childrenProps?.transaction?.date.split(".")[0] || DateTimeInput(),
    bankAccountId: childrenProps?.transaction?.bankAccountId || "",
    number: childrenProps?.transaction?.number || "",
    amount: childrenProps?.transaction?.amount || "",
    providerFees: childrenProps?.transaction?.providerFees || 0,
    providerRevenue: childrenProps?.transaction?.providerRevenue || 0,
    note: childrenProps?.transaction?.note || "",
  });


  function DateTimeInput() {
    const getCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = `${now.getMonth() + 1}`.padStart(2, '0');
      const day = `${now.getDate()}`.padStart(2, '0');
      const hours = `${now.getHours()}`.padStart(2, '0');
      const minutes = `${now.getMinutes()}`.padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    return getCurrentDateTime();
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createDeposite, { isLoading: createLoading }] = useCreateDepositeMutation()
  const [updateDeposite, { isLoading: updateLoading }] = useUpdateDepositeMutation()


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
      console.log(form)

      const error = validateDeposite(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.transaction
          ? await updateDeposite({ transactionId: childrenProps?.transaction.id, form }).unwrap()
          : await createDeposite(form).unwrap();
        notify('success', response.message);

        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='deposite-form'>
          <DropDown
            balance={balance}
            setBalance={setBalance}
            form={form}
            setForm={setForm}
            disabled={childrenProps?.transaction ? true : false}
          />
          <CustomInput
            width={'49%'}
            type='text'
            name='number'
            value={form.number}
            label='الرقم'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'49%'}
            type='text'
            name='amount'
            value={form.amount}
            label='قيمة الفاتورة'
            onChange={(e) => {
              setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })
              onChange(e)
            }}
            onBlur={(e) => setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })}
          />
          <CustomInput
            width={'49%'}
            type='text'
            name='providerFees'
            value={form.providerFees}
            label='رسوم المزود'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'49%'}
            type='text'
            name='providerRevenue'
            value={form.providerRevenue}
            label='عائد مزود الخدمة'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'100%'}
            type='datetime-local'
            name='date'
            value={form.date}
            label='التاريخ'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'100%'}
            type='textarea'
            name='note'
            value={form.note}
            label='ملحوظة'
            onChange={(e) => onChange(e)}
          />
        </div>
        {balance.before && <div className="balance">
          <ul>
            <li>
              رصيد قبل
              <span> {balance.before}</span>
            </li>
            {balance.after && <li>
              رصيد بعد
              <span> {balance.after}</span>
            </li>}
          </ul>
        </div>}
        <FormButtons />
      </form>
    </div>
  )
}
