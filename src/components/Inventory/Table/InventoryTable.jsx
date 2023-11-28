/* eslint-disable react/prop-types */

import { Table } from "@mantine/core";
import CustomTable from '../../common/CustomTable/CustomTable';



export default function InventoryTable({ data }) {


  const rows = (
    <>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          أرصدة التجار
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          {data?.totalAgentTreasury}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          أرصدة الحسابات
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          (-)   {data?.totalBankAmount}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          أرصدة المزودين
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          (-)     {data?.totalProviderTreasury}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          أرصدة أخري
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          (-)    {data?.totalAddionalTreasury}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          الربح
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          (-) {data?.totalProfits}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} bg={'#edf2ff'}>
          مستحقات
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4caf5042',
          fontWeight: 'bold'
        }}>
          (-) {data?.totalDues}
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={4} style={{
          backgroundColor: '#4fb5ab',
          color: "white"
        }}>
          صافي الرصيد المتاح
        </Table.Td>
        <Table.Td style={{
          backgroundColor: '#4fb5ab',
          color: "white",
          fontWeight: 'bold'
        }}>
          {data?.totalCurrentBalance}
        </Table.Td>
      </Table.Tr>
    </>
  )





  return (
    <CustomTable rows={rows} />
  )
}
