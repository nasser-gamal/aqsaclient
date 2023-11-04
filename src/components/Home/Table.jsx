/* eslint-disable react/prop-types */

import Table from '../common/Table/Table';

import DateAndTime from '../UI/DateAndTime/DateAndTime';
import { useDispatch } from 'react-redux';

import moreImg from '../../assets/icons/add-button.png'
import { openModal } from '../../app/features/modal/modalSlice';
import EditButton from '../UI/TableButtons/EditButton';
import DeleteButton from '../UI/TableButtons/DeleteButton';
import { useDeleteDepositeMutation } from '../../app/features/transaction/depositeApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { notify } from '../../utils/notify';

export default function BankReportTable({ data }) {
  const dispatch = useDispatch();


  const tableHead = [
    // {
    //   title: "رقم الفاتورة",
    //   className: "",
    //   order: "",
    //   sort: "ASC",
    // },
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
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
  ]


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
    <div className='report-table'>

      <Table tableHead={tableHead}>
        <tbody>
          {
            data?.transactions.transactions.map(transaction => {
              return <tr key={transaction.id}>
                {/* <td>
                  {transaction.id}
                </td> */}
                <td className='date'>
                  <DateAndTime createdAt={transaction.date} />
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
                  {transaction.type === 'سحب' &&
                    (transaction.balanceBefore - transaction.balanceAfter).toFixed(2) == transaction.amountTotal.toFixed(2) ?
                    transaction.amountTotal :
                    transaction.type !== 'سحب' ? 0 : transaction.providerDeduction}
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
                  {transaction.note || "-"}
                </td>
                <td>
                  <img style={{
                    'width': '28px',
                    'cursor': 'pointer',
                  }} src={moreImg} alt={moreImg}
                    onClick={() => dispatch(openModal({
                      name: transaction.type === 'سحب' ? "AddEditWithdraw" : "AddEditDeposit",
                      modalTitle: transaction.type === 'سحب' ? 'عرض بيانات العملية (سحب)' : 'عرض بيانات العملية (ايداع)',
                      status: 'عرض',
                      childrenProps: {
                        transaction,
                        show: true,
                        width: transaction.type === 'سحب' && '700px'
                      }
                    }))}
                  />
                </td>
                <td>
                  <EditButton
                    editProps={{
                      name: transaction.type === 'سحب' ? "AddEditWithdraw" : "AddEditDeposit",
                      modalTitle: 'تعديل العملية',
                      status: 'تعديل',
                      childrenProps: {
                        transaction,
                        width: transaction.type === 'سحب' && '700px'
                      }
                    }}
                  />
                </td>
                <td>
                  <DeleteButton onClick={() => handleDelete(transaction.id)} />
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
            <td colSpan={8}>
            </td>

          </tr>
        </tbody>
      </Table>
    </div>
  )
}
