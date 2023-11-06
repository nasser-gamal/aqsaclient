/* eslint-disable react/prop-types */

import Table from '../common/Table/Table';

import DateAndTime from '../UI/DateAndTime/DateAndTime';
import { useDispatch } from 'react-redux';

import moreImg from '../../assets/icons/add-button.png'
import { openModal } from '../../app/features/modal/modalSlice';
import EditButton from '../UI/TableButtons/EditButton';
import DeleteButton from '../UI/TableButtons/DeleteButton';
import { useDeleteDepositeMutation, } from '../../app/features/transaction/depositeApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { notify } from '../../utils/notify';
import { useDeleteWithDrawMutation } from '../../app/features/transaction/withDrawApi';
import ResotreButton from '../UI/RestoreData/ResotreButton';

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
  const [deletedWithdraw, { isLoading: deleteLoading }] = useDeleteWithDrawMutation();


  const handleDelete = async (type, transactionId) => {
    try {
      const response = type == 'deposite' ? await deleteDeposite(transactionId).unwrap()
        :
        deletedWithdraw(transactionId).unwrap()
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }



  useEffect(() => {
    if (isLoading || deleteLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [deleteLoading, dispatch, isLoading]);




  return (
    <div className='report-table'>

      <Table tableHead={tableHead}>
        <tbody>
          {
            data?.transactions.transactions.map(transaction => {
              return <tr key={transaction.id} className={transaction.isDeleted && 'row-delete'}>
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
                {transaction.isDeleted ? <>
                  <td colSpan={'2'}>
                    <ResotreButton
                      type={transaction.type === 'سحب' ? 'withdraw' : 'deposite'}
                      transactionId={transaction.id}
                    />
                  </td>
                </> :
                  <>
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
                      <DeleteButton
                        onClick={() => handleDelete(transaction.type === 'سحب' ? 'withdraw'
                          : 'deposite', transaction.id)} />
                    </td>
                  </>
                }
              </tr>
            })
          }
          <tr className='last-child'>
            <td colSpan={3}>
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
