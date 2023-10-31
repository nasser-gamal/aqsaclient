import './home.modules.css';

import Section from './Section';
import depositeImg from '../../assets/icons/deposit.png';
import withdrawImg from '../../assets/icons/withdraw.png';
import transferImg from '../../assets/icons/transfer.png';
import reportImg from '../../assets/icons/report.png';
import DropDown from './DropDown';
import { useState } from 'react';
import { DateInput } from '../../utils/formatDate';
import BankReportTable from '../Reports/BankAccount/Table/BankReportTable';
import { useFindUserTransactionsQuery } from '../../app/features/reports/reportsApi';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import ReportPeriod from './ReportPeriod/ReportPeriod';
import Pagination from '../UI/Pagination/Pagination';
import { TbRefresh } from 'react-icons/tb';
import { useEffect } from 'react';
import { useFindAllBankAccountsQuery } from '../../app/features/bankAccount/bankAccountApi';


export default function Index() {
  const { page, limit, orderBy } = useSelector(state => state.filter);
  const dispatch = useDispatch();


  const { data: bankAccounts, isLoading: getLoading, isFetching: getFetching } = useFindAllBankAccountsQuery(
    {
      page: "", limit: "", order: 'createdAt', sort: 'ASC'
    }
  );



  const [form, setForm] = useState({
    bankAccountId: '',
    bankAccountName: '',
    startDate: DateInput(),
    endDate: DateInput(),
  });


  const [balance, setBalance] = useState()

  const [showForm, setShowForm] = useState(false)
  const [skip, setSkip] = useState(true);


  const { data, isLoading, isFetching, refetch } = useFindUserTransactionsQuery({
    bankAccountId: form.bankAccountId,
    startDate: form?.startDate,
    endDate: form?.endDate,
    page,
    limit,
    order: orderBy,
    sort: "ASC"
  }, { skip });


  useEffect(() => {
    if (getLoading || getFetching || isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, isFetching, dispatch, getLoading, getFetching])

  const handleBoxClick = () => {
    setSkip(true)
    setShowForm(true)
  }

  return (
    <>
      <div>
        <div style={{
          width: '350px',
          maxWidth: '100%'
        }}>
          <DropDown
            data={bankAccounts}
            form={form}
            setForm={setForm}
            setBalance={setBalance}
            setSkip={setSkip}
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
                childrenProps: { bankAccountId: form.bankAccountId, balanceBefore: balance, bankAccountName: form.bankAccountName }
              }
            },
            {
              boxTitle: 'سحب',
              img: withdrawImg,
              info: {
                name: 'AddEditWithdraw',
                modalTitle: 'اضافة عملية سحب جديدة',
                status: 'اضافة',
                childrenProps: { width: '700px', bankAccountId: form.bankAccountId, balanceBefore: balance, bankAccountName: form.bankAccountName }
              }
            },
            {
              boxTitle: 'تسوية',
              img: transferImg,
              info: {
                name: 'AddEditTransfer',
                modalTitle: 'اضافة عملية تسوية جديدة',
                status: 'اضافة',
                childrenProps: { bankAccountId: form.bankAccountId, bankAccountName: form.bankAccountName }
              }
            },
            {
              boxTitle: 'تقرير',
              img: reportImg,
              click: handleBoxClick
            },
          ]
        } />

        {showForm &&
          <ReportPeriod
            form={form}
            setForm={setForm}
            setSkip={setSkip}
            setShowForm={setShowForm}
            refetch={refetch}
          />
        }

        {showForm && data && data?.transactions?.transactions.length > 0 &&
          <>
            <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>
              تقرير شامل لحساب
              <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.bankAccountName}</span>
              الفترة ما بين <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.startDate.replaceAll('-', '/')}</span>
              إلي
              <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.endDate.replaceAll('-', '/')}</span>
            </h4>
            <div style={{
              width: '100%',
              textAlign: 'right'
            }}>
              <span>
                <TbRefresh style={{
                  fontSize: '26px',
                  color: 'black',
                  cursor: 'pointer'
                }}
                  onClick={() => refetch()}
                />
              </span>
            </div>
            <BankReportTable data={data} />
            {data && data?.transactions?.transactions.length < 1 && <div
              style={{
                textAlign: 'center',
                fontsize: '26px',
              }}
            ><span>لا توجد عمليات</span></div>}
            {data?.transactions?.pagination?.hasPagination && <Pagination pagination={data?.transactions?.pagination} />}
          </>
        }
        {
          showForm && data && data?.transactions?.transactions.length < 1 &&
          <>
            <h4 style={{ marginBottom: '20px', textAlign: 'center' }}>
              تقرير شامل لحساب
              <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.bankAccountName}</span>
              الفترة ما بين <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.startDate.replaceAll('-', '/')}</span>
              إلي
              <span style={{ color: 'red', fontWeight: 'bold', margin: '0 5px', display: 'inline-block' }}>{form.endDate.replaceAll('-', '/')}</span>
            </h4>
            <p style={{ textAlign: 'center' }}>
              لا يوجد أي عمليات علي الحساب في هذه الفترة
            </p>
          </>
        }

      </div>
    </>
  )
}


