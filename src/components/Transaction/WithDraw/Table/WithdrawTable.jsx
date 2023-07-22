/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import Spinner from '../../../UI/Loader/Spinner';


import moreImg from '../../../../assets/icons/add-button.png'
import { openModal } from '../../../../app/features/modal/modalSlice';
import { useDispatch } from 'react-redux';

export default function DepositTable({ data, isLoading }) {
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
    // {
    //   title: "ايداع",
    //   className: "",
    //   order: "",
    //   sort: "ASC",
    // },
    // {
    //   title: "سحب",
    //   className: "",
    //   order: "",
    //   sort: "ASC",
    // },

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
  ]



  if (isLoading) {
    return <Spinner />
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
              {/* <td>
                {transaction.type === 'ايداع' ? transaction.amountTotal : 0}
              </td>
              <td>
                {transaction.type === 'سحب' ? transaction.amountTotal : 0}
              </td> */}
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
                    name: "TransactionInfo",
                    modalTitle: 'عرض بيانات العملية',
                    status: 'عرض',
                    childrenProps: { transaction, width: '1000px' }
                  }))}
                />
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
      </tbody>
    </Table>
  )
}
