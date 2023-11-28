/* eslint-disable react/prop-types */

import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import CustomTable from '../../../common/CustomTable/CustomTable';
import { Table } from '@mantine/core';


export default function FeesReportTable({ data }) {

  const theads = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "بواسطة",
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
      title: "القيمة",
      className: "",
      order: "",
      sort: "",
    },
  ]
  console.log(data)

  const rows = data?.map(element => {
    return <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td className='date'>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>
        {element?.creator?.userName}
      </Table.Td>
      <Table.Td>
        {element.note || "-"}
      </Table.Td>
      <Table.Td>
        {element.amount}
      </Table.Td>
    </Table.Tr>
  })

  const tFoot = <Table.Tr className='last-child' >
    <Table.Td colSpan={3}>
      الاجمالي
    </Table.Td>
    <Table.Td>
      {data?.totalFees}
    </Table.Td>
  </Table.Tr>
  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} />
  )
}
