/* eslint-disable react/prop-types */

import { Table } from "@mantine/core"
import CustomTable from '../../common/CustomTable/CustomTable';



export default function ProfitTable({ data}) {

  const theads = [
    {
      title: "الايداع",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عدد العمليات",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "السحب",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عدد العمليات",
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
  ]


  const rows = <>
    <Table.Tr>
      <Table.Td>
        {data?.transactions?.totalDepoite}
      </Table.Td>
      <Table.Td>
        {data?.transactions?.totalDepoiteCount}
      </Table.Td>
      <Table.Td>
        {data?.transactions?.totalWithdraw}
      </Table.Td>
      <Table.Td>
        {data?.transactions?.totalWithdrawCount}
      </Table.Td>
      <Table.Td>
        -
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td colSpan={4} style={{
        backgroundColor: '#ebebeb',
      }}>
        عمولة الفواتير اليومية
      </Table.Td>
      <Table.Td style={{
        backgroundColor: '#4caf5042',
        fontWeight: 'bold'
      }}>
        {data?.transactions?.profits}
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td colSpan={4} style={{
        backgroundColor: '#ebebeb',
      }}>
        عمولة المزودين
      </Table.Td>
      <Table.Td style={{
        backgroundColor: '#4caf5042',
        fontWeight: 'bold'
      }}>
        (+)   {data?.totalProviderCommission}
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td colSpan={4} style={{
        backgroundColor: '#ebebeb',
      }}>
        اجمالي العمولة
      </Table.Td>
      <Table.Td style={{
        backgroundColor: '#4caf5042',
        fontWeight: 'bold'
      }}>
        (+)   {(+data?.transactions?.profits + +data?.totalProviderCommission).toFixed(2)}
      </Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td colSpan={4} style={{
        backgroundColor: '#ebebeb',
      }}>
        عمولة الوكلاء
      </Table.Td>
      <Table.Td style={{
        backgroundColor: '#4caf5042',
        fontWeight: 'bold'
      }}>
        (-)    {data?.commissions?.totalCommission}
      </Table.Td>
    </Table.Tr>

    <Table.Tr>
      <Table.Td colSpan={4} style={{
        backgroundColor: '#ebebeb',
      }}>
        مصاريف أخري
      </Table.Td>
      <Table.Td style={{
        backgroundColor: '#4caf5042',
        fontWeight: 'bold'
      }}>
        (-) {data?.totalFees}
      </Table.Td>
    </Table.Tr>

  </>


  const tFoot = <Table.Tr>
    <Table.Td colSpan={4}>
      صافي الربح
    </Table.Td>
    <Table.Td >
      {data?.transactions?.totalProfits}
    </Table.Td>
  </Table.Tr>


  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} />
  )
}
