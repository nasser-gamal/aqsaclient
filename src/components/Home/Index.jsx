import './home.modules.css';

import Section from './Section';
import depositeImg from '../../assets/icons/deposit.png';
import withdrawImg from '../../assets/icons/withdraw.png';
import transferImg from '../../assets/icons/transfer.png';


export default function Index() {


  return (
    <div>
      <Section title={'العمليات'} boxes={
        [
          {
            boxTitle: 'ايداع',
            img: depositeImg,
            info: {
              name: 'AddEditDeposit',
              modalTitle: 'اضافة عملية ايداع جديدة',
              status: 'اضافة',
            }
          },
          {
            boxTitle: 'سحب',
            img: withdrawImg,
            info: {
              name: 'AddEditWithdraw',
              modalTitle: 'اضافة عملية سحب جديدة',
              status: 'اضافة',
              childrenProps: { width: '700px' }
            }
          },
          {
            boxTitle: 'تسوية',
            img: transferImg,
            info: {
              name: 'AddEditTransfer',
              modalTitle: 'اضافة عملية تسوية جديدة',
              status: 'اضافة',
            }
          },
        ]
      } />
      {/* <Section title={'الموظفين'} boxes={
        [
          {
            boxTitle: 'احمد جمعة',
            bodyTitle: 'عدد العمليات',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'عمر جمعة',
            bodyTitle: 'عدد العمليات',
            bodyInfo: '1200'
          },
        ]
      } />
      <Section title={'الخزينة'} boxes={
        [
          {
            boxTitle: 'الخزينة',
            bodyTitle: 'الارباح',
            bodyInfo: 0
          },
        ]
      } /> */}
    </div>
  )
}


