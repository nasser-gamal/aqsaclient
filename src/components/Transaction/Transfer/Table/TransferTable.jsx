/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';


export default function TransferTable({ transfers }) {


  const tableHead = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "قيمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المحول منه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرصيد قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الرصيد بعد",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المحول إليه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرصيد قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الرصيد بعد",
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

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          transfers?.map(transfer => {
            return <tr key={transfer.id}>
              <td>
                <DateAndTime createdAt={transfer.createdAt} />
              </td>
              <td>
                {transfer.amountTotal}
              </td>
              <td>
                {transfer.sender.accountName}
              </td>
              <td>
                {transfer.balanceSenderBefore}
              </td>
              <td>
                {transfer.balanceSenderAfter}
              </td>
              <td>
                {transfer.recipient.accountName}
              </td>
              <td>
                {transfer.balanceRecipientBefore}
              </td>
              <td>
                {transfer.balanceRecipientAfter}
              </td>
              <td>
                {transfer.note || "-"}
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditTransfer',
                    modalTitle: 'تعديل العملية',
                    status: 'تعديل',
                    childrenProps: { transfer }
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
