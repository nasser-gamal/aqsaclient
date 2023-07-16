/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import Spinner from '../../../UI/Loader/Spinner';

export default function DepositTable({ data, isLoading }) {

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
