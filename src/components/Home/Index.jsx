import './home.modules.css';

import Section from './Section';
import depositeImg from '../../assets/icons/deposit.png';
import withdrawImg from '../../assets/icons/withdraw.png';
import transferImg from '../../assets/icons/transfer.png';
import reportImg from '../../assets/icons/report.png';
import DropDown from './DropDown';
import { useState } from 'react';


export default function Index() {

  const [form, setForm] = useState({
    bankAccountId: '',
    startDate: '',
    endDate: ''
  });

  const [balance, setBalance] = useState()


  const handleDate = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }
  return (
    <div>
      <div style={{
        width: '350px'
      }}>
        <DropDown
          setForm={setForm}
          setBalance={setBalance}
        />
      </div>
      <Section active={form.bankAccountId ? true : false} title={'العمليات'} boxes={
        [
          {
            boxTitle: 'ايداع',
            img: depositeImg,
            info: {
              name: 'AddEditDeposit',
              modalTitle: 'اضافة عملية ايداع جديدة',
              status: 'اضافة',
              childrenProps: { bankAccountId: form.bankAccountId, balanceBefore: balance }
            }
          },
          {
            boxTitle: 'سحب',
            img: withdrawImg,
            info: {
              name: 'AddEditWithdraw',
              modalTitle: 'اضافة عملية سحب جديدة',
              status: 'اضافة',
              childrenProps: { width: '700px', bankAccountId: form.bankAccountId, balanceBefore: balance }
            }
          },
          {
            boxTitle: 'تسوية',
            img: transferImg,
            info: {
              name: 'AddEditTransfer',
              modalTitle: 'اضافة عملية تسوية جديدة',
              status: 'اضافة',
              childrenProps: { bankAccountId: form.bankAccountId }
            }
          },
          {
            boxTitle: 'تقرير',
            img: reportImg,
            info: {
              name: 'ReportPeriod',
              modalTitle: 'تقرير الحساب س',
              status: 'بحث',
              childrenProps: { form, setForm: handleDate }
            }
          },
        ]
      } />
    </div>
  )
}


