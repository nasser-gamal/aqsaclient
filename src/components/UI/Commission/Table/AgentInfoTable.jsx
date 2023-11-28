/* eslint-disable react/prop-types */

import { Table } from "@mantine/core";
import CustomTable from '../../../common/CustomTable/CustomTable';

export default function AgentInfoTable({ data }) {

  const theads = [
    {
      title: "الكود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الاسم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "البطاقة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الموبايل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },

    {
      title: "العنوان",
      className: "",
      order: "",
      sort: "",
    },
  ];

  console.log('data=-=', data)

  const rows =
    <Table.Tr key={data.id}>
      <Table.Td>
        {data?.agent?.accountNumber}
      </Table.Td>
      <Table.Td>
        {data?.agent?.userName}
      </Table.Td>
      <Table.Td>
        {data?.agent?.nationalId}
      </Table.Td>
      <Table.Td>
        {data?.agent?.phoneNumber}
      </Table.Td>
      <Table.Td>
        {data?.month}
        / {data?.year}
      </Table.Td>
      <Table.Td>
        {data?.agent?.address}
      </Table.Td>
    </Table.Tr >




  return (
    <CustomTable theads={theads} rows={rows} />

  )
}
