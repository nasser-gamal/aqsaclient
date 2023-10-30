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
    before: childrenProps?.balanceBefore || childrenProps?.transaction?.balanceBefore || "",
    after: childrenProps?.balanceBefore || childrenProps?.transaction?.balanceAfter || ""
  });

  const [form, setForm] = useState({
    date: childrenProps?.transaction?.date.split(".")[0] || DateTimeInput(),
    isPercentage: childrenProps?.transaction?.isPercentage || false,
    bankAccountId: childrenProps?.bankAccountId || childrenProps?.transaction?.bankAccountId || "",
    number: childrenProps?.transaction?.number || "",
    amount: childrenProps?.transaction?.amount || "",
    agentDeduction: childrenProps?.transaction?.agentDeduction || 0,
    agentRevenue: childrenProps?.transaction?.agentRevenue || 0,
    providerAmount: 0,
    fees: 0,
    providerPercentage: childrenProps?.transaction?.providerPercentage ? childrenProps?.transaction?.providerPercentage : childrenProps?.transaction?.providerRevenue || 0,
    providerFees: childrenProps?.transaction?.providerFees || 0,
    additionalFees: childrenProps?.transaction?.additionalFees || 0,
    isFeesPercentage: childrenProps?.transaction?.isFeesPercentage || false,
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


  const calcTotalAmount = () => {
    let amount;
    if (form.isFeesPercentage == true) {
      amount = +form.amount + (+form.amount * (+form.providerFees / 100))
    } else {
      amount = +form.amount + +form.providerFees
    }
    return +amount.toFixed(2);
  }


  const calcProviderDeduction = () => {
    let amount = calcTotalAmount();
    console.log(amount + +form.additionalFees)
    let totalProviderDeduction = amount + +form.additionalFees
    if (form.isPercentage == true) {
      totalProviderDeduction -= (+form.providerPercentage / 100) * (amount)
    } else {
      totalProviderDeduction -= +form.providerPercentage
    }

    return +totalProviderDeduction.toFixed(2);
  }


  const calcBalancAfter = () => {
    let balanceAfter = balance.before;
    const totalAmount = calcTotalAmount();
    const providerDeduction = calcProviderDeduction()
    if (form.isTotalRevenue) {
      balanceAfter -= totalAmount + +form.additionalFees;
    } else {
      balanceAfter -= providerDeduction;
    }
    return +balanceAfter.toFixed(2);
  }


  return (
    <div>
      {childrenProps?.show && <div className="balance" style={{ marginBottom: '20px' }}>
      <ul style={{ background: '#4caf5047'}}>
          <li>
            رصيد قبل
            <span> {balance.before}</span>
          </li>
          <li>
            رصيد بعد
            <span> {calcBalancAfter()}</span>
          </li>
        </ul>
      </div>}
      <form onSubmit={onSubmit}>
        <div className='withdraw-form'>
          <DropDown
            balance={balance}
            setBalance={setBalance}
            form={form}
            setForm={setForm}
            disabled={childrenProps?.show || childrenProps?.bankAccountId || childrenProps?.transaction ? true : false}

          />
          <CustomInput
            width={'30%'}
            type='datetime-local'
            name='date'
            value={form.date}
            label='التاريخ'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'30%'}
            type='text'
            name='number'
            value={form.number}
            label='الرقم'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}
          />
          <CustomInput
            width={'30%'}
            type='number'
            name='amount'
            value={form.amount}
            label='قيمة الفاتورة'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}
          />

          <CustomInput
            width={'30%'}
            type='number'
            name='providerFees'
            value={form.providerFees}
            label='رسوم المزود'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}
          />
          <CustomInput
            width={'30%'}
            type='number'
            value={calcTotalAmount() || 0}
            label='الاجمالي'
            disabled={true}

          />
          <div className='form-input' style={{
            width: '30%'
          }}>
            <div className='input-checkbox d-flex ' style={{
              gap: '10px',
            }}>
              <div className='d-flex' style={{
                gap: '10px',
                alignItems: "center"
              }}>
                <input
                  style={{
                    fontSize: '22px',
                    width: 'fit-content',
                    transform: 'scale(1.2)',
                  }}
                  id='isFeesPercentage'
                  type="checkbox"
                  name='isFeesPercentage'
                  value={form.isFeesPercentage}
                  onChange={() => setForm({ ...form, isFeesPercentage: !form.isFeesPercentage })}
                  checked={form.isFeesPercentage}
                  disabled={childrenProps?.show}

                />
                <label htmlFor="isFeesPercentage">
                  نسبة الرسوم
                  <span style={{
                    margin: '0 5px',
                    fontSize: "18px",
                    fontWeight: 'bold'
                  }}>%</span>
                </label>
              </div>
            </div>
            <div className='input-checkbox d-flex ' style={{
              gap: '10px',
            }}>
              <div className='d-flex' style={{
                gap: '10px',
                alignItems: "center"
              }}>
                <input
                  style={{
                    fontSize: '22px',
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
                  نسبة العائد
                  <span style={{
                    margin: '0 5px',
                    fontSize: "18px",
                    fontWeight: 'bold'
                  }}>%</span>
                </label>
              </div>
            </div>
          </div>


          <CustomInput
            width={'30%'}
            type='number'
            name='providerPercentage'
            value={form.providerPercentage}
            label='عائد مزود الخدمة'
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'30%'}
            type='number'
            value={calcProviderDeduction() || 0}
            label='اجمالي المخصوم من المزود'
            disabled={true}
          />
          {!childrenProps?.transaction &&
            <>
              <CustomInput
                width={'30%'}
                type='number'
                name='providerAmount'
                value={form.providerAmount}
                label='قيمة الفاتورة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, providerAmount: value, agentDeduction: (+value + +form.fees).toFixed(2) });
                }
                }
                disabled={childrenProps?.show}

              />
              <CustomInput
                width={'30%'}
                type='number'
                name='fees'
                value={form.fees}
                label='تكلفة الخدمة'
                onChange={(e) => {
                  const { value } = e.target
                  setForm({ ...form, fees: value, agentDeduction: (+form.providerAmount + +value).toFixed(2) });
                }}
                disabled={childrenProps?.show}

              />
            </>
          }
          <CustomInput
            width={'30%'}
            type='number'
            name='agentDeduction'
            label='المخصوم من المركز'
            disabled={childrenProps?.show || !childrenProps?.transaction ? true : false}
            value={!childrenProps?.transaction ? (+form.providerAmount + +form.fees).toFixed(2) : form.agentDeduction}
            onChange={(e) =>
              onChange(e)
            }

          />
          <CustomInput
            width={childrenProps?.transaction ? '30%' : '48%'}
            type='number'
            name='agentRevenue'
            label='عائد المركز'
            value={form.agentRevenue}
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={childrenProps?.transaction ? '30%' : '48%'}
            type='number'
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
                disabled={childrenProps?.show || childrenProps?.transaction ? true : false}

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
                disabled={childrenProps?.show || childrenProps?.transaction ? true : false}

              />
              <label htmlFor="revenue">
                المخصوم من مزود الخدمة
              </label>
            </div>
          </div>
          <CustomInput
            width={'30%'}
            type='number'
            label='رسوم أخري'
            name='additionalFees'
            value={form.additionalFees}
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

          />
          <CustomInput
            width={'30%'}
            type='number'
            label='عمولة أخري'
            name='additionalRevenue'
            value={form.additionalRevenue}
            onChange={(e) => onChange(e)}
            disabled={childrenProps?.show}

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
            <li>
              رصيد بعد
              <span> {calcBalancAfter()}</span>
            </li>
          </ul>
        </div>}
        {!childrenProps?.show && <FormButtons />}
      </form>
    </div>
  )
}
