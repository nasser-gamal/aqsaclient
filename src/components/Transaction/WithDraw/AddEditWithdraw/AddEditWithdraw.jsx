import { useEffect, useState } from 'react';
import CustomInput from '../../../common/FormFields/input/CustomInput';
import FormButtons from '../../../UI/FormButtons/FormButtons';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateWithDrawMutation, useUpdateWithDrawMutation } from '../../../../app/features/transaction/withDrawApi';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { closeModal } from '../../../../app/features/modal/modalSlice';
import { validateWithDraw } from '../../../../utils/validation';
import { notify } from '../../../../utils/notify';


export default function AddEditWithdraw() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [balance, setBalance] = useState({
    before: childrenProps?.transaction?.balanceBefore || "",
    after: childrenProps?.transaction?.balanceAfter || ""
  });

  const [form, setForm] = useState({
    date: childrenProps?.transaction?.date.split(".")[0] || DateTimeInput(),
    isPercentage: childrenProps?.transaction?.isPercentage || false,
    bankAccountId: childrenProps?.transaction?.bankAccountId || "",
    number: childrenProps?.transaction?.number || "",
    amount: childrenProps?.transaction?.amount || "",
    agentDeduction: childrenProps?.transaction?.agentDeduction || 0,
    agentRevenue: childrenProps?.transaction?.agentRevenue || 0,
    providerAmount: 0,
    fees: 0,
    providerPercentage: childrenProps?.transaction?.providerPercentage ? childrenProps?.transaction?.providerPercentage : childrenProps?.transaction?.providerRevenue || 0,
    providerFees: childrenProps?.transaction?.providerFees || 0,
    additionalFees: childrenProps?.transaction?.additionalFees || 0,
    additionalRevenue: childrenProps?.transaction?.additionalRevenue || 0,
    isTotalRevenue: ((childrenProps?.transaction?.balanceBefore - childrenProps?.transaction?.balanceAfter).toFixed(2) == childrenProps?.transaction?.amountTotal.toFixed(2)) ? true : (!childrenProps?.transaction ? true : false),
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

  const [createWithDraw, { isLoading: createLoading }] = useCreateWithDrawMutation()
  const [updateWithDraw, { isLoading: updateLoading }] = useUpdateWithDrawMutation()


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

      const error = validateWithDraw(form);
      if (error) {
        notify('error', error);
      } else {
      
        const response = childrenProps?.transaction
          ? await updateWithDraw({ transactionId: childrenProps?.transaction.id, form }).unwrap()
          : await createWithDraw(form).unwrap();
        notify('success', response.message);

        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  };



  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='withdraw-form'>
          <DropDown
            balance={balance}
            setBalance={setBalance}
            form={form}
            setForm={setForm}
            disabled={childrenProps?.transaction ? true : false}
          />
          <CustomInput
            width={'30%'}
            type='datetime-local'
            name='date'
            value={form.date}
            label='التاريخ'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'30%'}
            type='text'
            name='number'
            value={form.number}
            label='الرقم'
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'30%'}
            type='text'
            name='amount'
            value={form.amount}
            label='قيمة الفاتورة'
            onChange={(e) => {
              onChange(e)
            }}
          />
          <CustomInput
            width={'30%'}
            type='text'
            name='providerFees'
            value={form.providerFees}
            label='رسوم المزود'
            onChange={(e) => {
              onChange(e)
            }}
          />
          <CustomInput
            width={'30%'}
            type='text'
            value={(+form.amount + +form.providerFees).toFixed(2) || 0}
            label='الاجمالي'
            disabled={true}
          />
          <div className='input-checkbox d-flex ' style={{
            gap: '10px',
            width: '30%',
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
              />
              <label htmlFor="isPercentage">
                نسبة
              </label>
            </div>
          </div>
          <CustomInput
            width={'30%'}
            type='text'
            name='providerPercentage'
            value={form.providerPercentage}
            label='عائد مزود الخدمة'
            onChange={(e) => {
              onChange(e)
            }}
          />
          <CustomInput
            width={'30%'}
            type='text'
            value={((+form.amount + +form.providerFees + +form.additionalFees) - (form.isPercentage == true ? ((+form.providerPercentage / 100) * (+form.amount + +form.providerFees)) : +form.providerPercentage)).toFixed(2) || 0}
            label='اجمالي المخصوم من المزود'
            disabled={true}
          />
          {!childrenProps?.transaction &&
            <>
              <CustomInput
                width={'30%'}
                type='text'
                name='providerAmount'
                value={form.providerAmount}
                label='قيمة الفاتورة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, providerAmount: value, agentDeduction: (+form.value + +form.fees).toFixed(2) });
                }
                }
              />
              <CustomInput
                width={'30%'}
                type='text'
                name='fees'
                value={form.fees}
                label='تكلفة الخدمة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, fees: value, agentDeduction: (+form.providerAmount + +value).toFixed(2) });
                }}
              />
            </>
          }
          <CustomInput
            width={'30%'}
            type='text'
            name='agentDeduction'
            label='المخصوم من المركز'
            disabled={!childrenProps?.transaction ? true : false}
            value={!childrenProps?.transaction ? (+form.providerAmount + +form.fees).toFixed(2) : form.agentDeduction}
            onChange={(e) =>
              onChange(e)
            }
          />
          <CustomInput
            width={childrenProps?.transaction ? '30%' : '48%'}
            type='text'
            name='agentRevenue'
            label='عائد المركز'
            value={form.agentRevenue}
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={childrenProps?.transaction ? '30%' : '48%'}
            type='text'
            label='اجمالي المخصوم من المركز'
            value={childrenProps?.transaction ? (+form.agentDeduction - +form.agentRevenue).toFixed(2) : ((+form.providerAmount + +form.fees) - form.agentRevenue).toFixed(2)}
            disabled={true}
          />
          <div style={{
            padding: '10px 0'
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
                id='total'
                type="radio"
                name='total'
                value={false}
                onChange={() => setForm({ ...form, isTotalRevenue: true })}
                checked={form.isTotalRevenue === true}
                disabled={childrenProps?.transaction ? true : false}

              />
              <label htmlFor="total">
                الاجمالي
              </label>
            </div>
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
                id='revenue'
                type="radio"
                name='revenue'
                value={true}
                onChange={() => setForm({ ...form, isTotalRevenue: false })}
                checked={form.isTotalRevenue === false}
                disabled={childrenProps?.transaction ? true : false}

              />
              <label htmlFor="revenue">
                المخصوم من مزود الخدمة
              </label>
            </div>
          </div>
          <CustomInput
            width={'30%'}
            type='text'
            label='رسوم أخري'
            name='additionalFees'
            value={form.additionalFees}
            onChange={(e) => onChange(e)}
          />
          <CustomInput
            width={'30%'}
            type='text'
            label='عمولة أخري'
            name='additionalRevenue'
            value={form.additionalRevenue}
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
            <li>
              رصيد بعد
              <span> {(balance.before - (form.isTotalRevenue ? (+form.amount + +form.providerFees + +form.additionalFees) : ((+form.amount + +form.providerFees + +form.additionalFees) - (form.isPercentage == true ? (+form.providerPercentage / 100) * +form.amount : +form.providerPercentage)))).toFixed(2)}</span>
            </li>
          </ul>
        </div>}
        <FormButtons />
      </form>
    </div>
  )
}
