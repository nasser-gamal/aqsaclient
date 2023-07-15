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
    before: "",
    after: ""
  });


  const [form, setForm] = useState({
    bankAccountId: "",
    number: "",
    amount: "",
    providerFees: "",
    providerRevenue: "",
    note: "",
  });


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

      const error = validateDeposite(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.bank
          ? await updateDeposite({ bankId: childrenProps?.bank.id, form }).unwrap()
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
            type='textarea'
            name='note'
            value={form.note}
            label='ملحوظة'
            onChange={(e) => onChange(e)}
          />
          {/* <CustomInput width={'49%'} type='text' name='bankAccount' label='الاجمالي' disabled={true} /> */}
          {/* <CustomInput width={'49%'} type='text' name='bankAccount' label='المخصوم من المركز' /> */}
          {/* <CustomInput width={'49%'} type='text' name='bankAccount' label='عائد المركز' /> */}
          {/* <CustomInput width={'49%'} type='text' name='bankAccount' label='صافي الربح' /> */}
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
