/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';


import moreImg from '../../../../assets/icons/add-button.png'
import { openModal } from '../../../../app/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import DeleteButton from '../../../UI/TableButtons/DeleteButton';
import { useDeleteDepositeMutation } from '../../../../app/features/transaction/depositeApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { notify } from '../../../../utils/notify';

export default function DepositTable({ data }) {
  const dispatch = useDispatch();

  const tableHead = [
    {
      title: "رقم الفاتورة",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
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
      title: "رصيد بعد",
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
      title: "#",
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
    {
      title: "حذف",
      className: "",
      order: "",
      sort: "",
    },
  ];


  const [deleteDeposite, { isLoading }] = useDeleteDepositeMutation();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (transactionId) => {
    try {
      const response = await deleteDeposite(transactionId).unwrap();
      notify('success', response.message)
    } catch (err) {
      notify('error', err.data.message)
    }
  }




  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.transactions.map(transaction => {
            return <tr key={transaction.id}>
              <td>
                {transaction.id}
              </td>
              <td className='date'>
                <DateAndTime createdAt={transaction.date} />
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
                {transaction.amount}
              </td>
              <td>
                {transaction.providerFees}
              </td>
              <td>
                {transaction.amountTotal}
              </td>
              <td>
                {transaction.balanceAfter}
              </td>
              <td>
                {transaction.providerRevenue}
              </td>
              <td>
                {transaction.profit}
              </td>
              <td>
                {transaction.note || "-"}
              </td>
              <td>
                <img style={{
                  'width': '28px',
                  'cursor': 'pointer',
                }} src={moreImg} alt={moreImg}
                  onClick={() => dispatch(openModal({
                    name: "AddEditDeposit",
                    modalTitle: 'عرض بيانات العملية',
                    status: 'عرض',
                    childrenProps: { transaction, show: true }
                  }))}
                />
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
              <td>
                <DeleteButton onClick={() => handleDelete(transaction.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
