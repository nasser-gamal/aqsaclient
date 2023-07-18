/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import Spinner from '../../../UI/Loader/Spinner';
import CustomButton from '../../../common/Button/CustomButton';
import { useExportExcelMutation } from '../../../../app/features/reports/reportsApi';
import { useEffect, useState } from 'react';
import { notify } from '../../../../utils/notify';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';

export default function BankReportTable({ data, isLoading, form }) {

  const tableHead = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "نوع العملية",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "البنك",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "رصيد قبل",
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
      title: "الرقم",
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
      title: "الحالة",
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

  const dispatch = useDispatch();
  const [exportExcel, { isLoading: exportLoading }] = useExportExcelMutation()


  const handleClick = async () => {
    try {
      const response = await exportExcel({ bankNumber: form.accountNumber, startDate: form.startDate, endDate: form.endDate }).unwrap()
      notify('success', response.message)
    } catch (err) {
      notify('error', err.data.message)
    }
  }

  useEffect(() => {
    if (exportLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, exportLoading])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
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
            data?.transactions.map(transaction => {
              return <tr key={transaction.id}>
                <td>
                  <DateAndTime createdAt={transaction.createdAt} />
                </td>
                <td>
                  {transaction.type}
                </td>
                <td>
                  {transaction.bankAccount.accountName}
                </td>
                <td>
                  {transaction.balanceBefore}
                </td>
                <td>
                  {transaction.balanceAfter}
                </td>
                <td>
                  {transaction.number}
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
                  {transaction.status}
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
                      name: 'AddEditDeposit',
                      modalTitle: 'تعديل العملية',
                      status: 'تعديل',
                      childrenProps: { transaction }
                    }}
                  />
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </div>
  )
}
