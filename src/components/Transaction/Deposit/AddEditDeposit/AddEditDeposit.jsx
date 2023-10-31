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
    before: childrenProps?.balanceBefore || childrenProps?.transaction?.balanceBefore || "",
    after: childrenProps?.balanceBefore || childrenProps?.transaction?.balanceAfter || ""
  });


  const [form, setForm] = useState({
    bankAccountId: childrenProps?.bankAccountId || childrenProps?.transaction?.bankAccountId || "",
    isPercentage: childrenProps?.transaction?.isPercentage || false,
    date: childrenProps?.transaction?.date.split(".")[0] || DateTimeInput(),
    number: childrenProps?.transaction?.number || "",
    amount: childrenProps?.transaction?.amount || "",
    providerFees: childrenProps?.transaction?.providerFees || 0,
    providerPercentage: childrenProps?.transaction?.providerPercentage ? childrenProps?.transaction?.providerPercentage : childrenProps?.transaction?.providerRevenue || 0,
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


  const calcProfit = () => {
    let providerRevenue;
    if (form.isPercentage) {
      providerRevenue = (form.providerPercentage / 100) * form.amountTotal
    } else {
      providerRevenue = form.providerPercentage
    }
    let profit = (+providerRevenue - +form.providerFees).toFixed(2);
    return profit
  }


  return (
    <div>
      {childrenProps?.show &&
        <>
          <div className="balance" style={{ marginBottom: '10px' }}>
            <ul style={{ background: '#4caf5047' }}>
              <li>
                رصيد قبل
                <span> {balance.before}</span>
              </li>
              <li>
                رصيد بعد
                <span> {(+balance.before + ((+form.amount + +form.providerFees))).toFixed(2)}</span>
              </li>
            </ul>
          </div>
          <div style={{
            textAlign: 'center'
          }}>
            <h5>
              بواسطة
            </h5>
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {childrenProps?.transaction?.creator.userName}
            </span>
          </div>
        </>
      }
      <form onSubmit={onSubmit}>
        <div className='deposite-form'>

          {childrenProps?.bankAccountId || childrenProps?.show ?
            <CustomInput
              width={'100%'}
              type='text'
              name='bankAccountId'
              value={childrenProps?.bankAccountName || childrenProps?.transaction?.bankAccount?.accountName}
              label='الحساب'
              onChange={(e) => onChange(e)}
              disabled={childrenProps?.show || childrenProps?.bankAccountId}
            /> :
            <DropDown
              balance={balance}
              setBalance={setBalance}
              form={form}
              setForm={setForm}
              disabled={childrenProps?.bankAccountId || childrenProps?.transaction ? true : false}
            />}
          <CustomInput
            width={'49%'}
            type='text'
            name='number'
            value={form.number}
            label='الرقم'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}
          />
          <CustomInput
            width={'49%'}
            type='number'
            name='amount'
            value={form.amount}
            label='قيمة الفاتورة'
            onChange={(e) => {
              setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })
              onChange(e)
            }}
            onBlur={(e) => setBalance({ ...balance, after: (+e.target.value + +balance.before).toFixed(2) })}
            disabled={childrenProps?.show}

          />
          <div className='input-checkbox d-flex ' style={{
            gap: '10px',
            width: '100%',
          }}>
            <div className='d-flex' style={{
              gap: '10px',
              alignItems: "center"
            }}>
              <input
                style={{
                  fontSize: '30px',
                  width: 'fit-content',
                  transform: 'scale(1.2)',
                }}
                id='isPercentage'
                type="checkbox"
                name='isPercentage'
                value={form.isPercentage}
                onChange={() => setForm({ ...form, isPercentage: !form.isPercentage })}
                checked={form.isPercentage}
                disabled={childrenProps?.show}

              />
              <label htmlFor="isPercentage">
                نسبة
              </label>
            </div>
          </div>
          <CustomInput
            width={'49%'}
            type='number'
            name='providerFees'
            value={form.providerFees}
            label='رسوم المزود'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'49%'}
            type='number'
            name='providerPercentage'
            value={form.providerPercentage}
            label='عائد مزود الخدمة'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'100%'}
            type='datetime-local'
            name='date'
            value={form.date}
            label='التاريخ'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'100%'}
            type='text'
            value={childrenProps?.transaction?.profit || calcProfit()}
            label='الربح'
            onChange={(e) => onChange(e)}
            disabled={true}
          />

          <CustomInput
            width={'100%'}
            type='textarea'
            name='note'
            value={form.note}
            label='ملحوظة'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
        </div>
        {balance.before && !childrenProps?.show && <div className="balance">
          <ul>
            <li>
              رصيد قبل
              <span> {balance.before}</span>
            </li>
            {balance.after && <li>
              رصيد بعد
              <span> {
                <span> {(+balance.before + ((+form.amount + +form.providerFees))).toFixed(2)}</span>
              }</span>
            </li>}
          </ul>
        </div>}
        {!childrenProps?.show && <FormButtons />}




      </form>
    </div>
  )
}
