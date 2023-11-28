/* eslint-disable react/prop-types */

import { Table } from '@mantine/core';
import CustomTable from '../../../common/CustomTable/CustomTable';

export default function CommissionsReportTable({ data }) {

  const theads = [
    {
      title: "المركز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الوكيل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "العمولة",
      className: "",
      order: "",
      sort: "",
    },
  ]


  const rows = data?.agentCommissions?.map((comission) => {
    return <Table.Tr key={comission.id}>
      <Table.Td>
        {comission?.agent.accountNumber}
      </Table.Td>
      <Table.Td>
        {comission?.agent.userName}
      </Table.Td>
      <Table.Td>
        {comission?.commissionAmount}
      </Table.Td>
    </Table.Tr>
  })

  const tFoot = <Table.Tr className='last-child'>
    <Table.Td colSpan={2}>
      الاجمالي
    </Table.Td>
    <Table.Td>
      {data?.totalCommission}
    </Table.Td>
  </Table.Tr>




  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} />
  )
}
