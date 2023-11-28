/* eslint-disable react/prop-types */

import { Table } from '@mantine/core';
import CustomTable from '../../common/CustomTable/CustomTable';

export default function AgentSegmentsTable({ data }) {

  console.log(data)
  const theads = [
    {
      title: "الشريحة",
      className: "title",
      order: "title",
      sort: "ASC",
    },
    {
      title: "اسم الخدمة",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "من",
      className: "start",
      order: "start",
      sort: "ASC",
    },
    {
      title: "إلي",
      className: "end",
      order: "end",
      sort: "ASC",
    },
    {
      title: "النسبة",
      className: "",
      order: "",
      sort: "ASC",
    },

  ];



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element?.service?.name || "-"}</Table.Td>
      <Table.Td>{element.start}</Table.Td>
      <Table.Td>{element.end || "-"}</Table.Td>
      <Table.Td>{(element.percentage) + "%"}</Table.Td>
    </Table.Tr >
  ));


  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
