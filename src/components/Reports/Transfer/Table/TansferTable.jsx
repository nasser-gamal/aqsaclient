/* eslint-disable react/prop-types */


import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import CustomTable from '../../../common/CustomTable/CustomTable';
import { Table } from '@mantine/core';


export default function TransferTable({ data }) {

  const theads = [
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
  ]

  const rows = data?.map(element => {
    return <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>
        {element?.amountTotal}
      </Table.Td>
      <Table.Td>
        {element?.sender?.accountName}
      </Table.Td>
      <Table.Td>
        {element?.balanceSenderBefore}
      </Table.Td>
      <Table.Td>
        {element?.balanceSenderAfter}
      </Table.Td>
      <Table.Td>
        {element?.recipient?.accountName}
      </Table.Td>
      <Table.Td>
        {element?.balanceRecipientBefore}
      </Table.Td>
      <Table.Td>
        {element?.balanceRecipientAfter}
      </Table.Td>
      <Table.Td>
        {element?.note || "-"}
      </Table.Td>
    </Table.Tr>
  })

  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
