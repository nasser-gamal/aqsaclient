/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import Spinner from '../../../UI/Loader/Spinner';
import CustomButton from '../../../common/Button/CustomButton';
import { useEffect, useState } from 'react';
import { notify } from '../../../../utils/notify';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';

import { saveAs } from 'file-saver'
import axios from 'axios';
import apiEndpoints from '../../../../utils/endPoints';

export default function BankReportTable({ data, isLoading, form }) {
  const dispatch = useDispatch();


  const tableHead = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    // {
    //   title: "نوع العملية",
    //   className: "",
    //   order: "",
    //   sort: "ASC",
    // },
    {
      title: "الحساب",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرقم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رصيد قبل",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "ايداع",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "سحب",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "رصيد بعد",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "قيمة الفاتورة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رسوم المزود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الاجمالي",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عائد مزود الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المخصوم من المزود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المخصوم من المركز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: " عائد المركز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اجمالي المخصوم من المركز",
      className: "",
      order: "",
      sort: "",
    },
    // {
    //   title: "المخصوم من المراكز",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    // {
    //   title: " عائد المراكز",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    {
      title: "صافي الربح",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "ملحوظة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
  ]


  const handleClick = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_TRANSACTION}?bankNumber=${form.bankNumber}&startDate=${form.startDate}&endDate=${form.endDate}`, {
        headers: { 'Content-Type': 'blob' },
        responseType: 'arraybuffer',
        withCredentials: true,
      });
      const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(file, 'data.xlsx');
      dispatch(hideLoader())
    } catch (err) {
      dispatch(hideLoader())
      notify('error', err.data.message)
    }
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='report-table'>
      <CustomButton
        type='button'
        classes={'add-btn'}
        width={'80px'}
        height={'30px'}
        fontSize={'20px'}
        onClick={handleClick}
      >تصدير
      </CustomButton>
      <Table tableHead={tableHead}>
        <tbody>
          {
            data?.transactions.transactions.map(transaction => {
              return <tr key={transaction.id}>
                <td className='date'>
                  <DateAndTime createdAt={transaction.createdAt} />
                </td>
                <td>
                  {transaction.bankAccount?.accountName}
                </td>
                <td>
                  {transaction.number}
                </td>
                <td>
                  {transaction.balanceBefore}
                </td>
                <td>
                  {transaction.type === 'ايداع' ? transaction.amountTotal : 0}
                </td>
                <td>
                  {transaction.type === 'سحب' ? transaction.amountTotal : 0}
                </td>
                <td>
                  {transaction.balanceAfter}
                </td>

                <td>
                  {transaction.amount}
                </td>
                <td>
                  {transaction.providerFees}
                </td>
                <td>
                  {transaction.amountTotal}
                </td>
                <td>
                  {transaction.providerRevenue}
                </td>
                <td>
                  {transaction.providerDeduction}
                </td>
                <td>
                  {transaction.agentDeduction}
                </td>
                <td>
                  {transaction.agentRevenue}
                </td>
                <td>
                  {transaction.agentTotalDeduction}
                </td>
                <td>
                  {transaction.profit}
                </td>
                <td>
                  {transaction.note || "-"}
                </td>
                <td>
                  <EditButton
                    editProps={{
                      name: 'AddEditWithdraw',
                      modalTitle: 'تعديل عملية سحب',
                      status: 'تعديل',
                      childrenProps: { transaction, width: '700px' }
                    }}
                  />
                </td>
              </tr>
            })
          }
          <tr className='last-child'>
            <td colSpan={4}>
              اجمالي العمليات
            </td>
            <td>
              {data?.totalDepoite}
            </td>
            <td>
              {data?.totalWithdraw}
            </td>
            <td colSpan={9}>
            </td>
            <td>
              {data?.totalProfit}
            </td>
            <td colSpan={2}>

            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
