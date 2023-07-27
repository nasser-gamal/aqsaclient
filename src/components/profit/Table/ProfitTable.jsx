/* eslint-disable react/prop-types */

import Table from '../../../components/common/Table/Table';


export default function ProfitTable({ data }) {
  console.log(data)

  const tableHead = [
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


  return (
    <div className='report-table'>
      <Table tableHead={tableHead}>
        <tbody>
          <tr >
            <td>
              {data?.transactions?.totalDepoite}
            </td>
            <td>
              {data?.transactions?.totalDepoiteCount}
            </td>
            <td>
              {data?.transactions?.totalWithdraw}
            </td>
            <td>
              {data?.transactions?.totalWithdrawCount}
            </td>
            <td>
              -
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              الربح
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              {data?.transactions?.profits}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              اجمالي العمولة
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              {data?.commissions?.totalCommission}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              مصاريف أخري
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              {data?.totalFees}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              صافي الربح
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              {data?.transactions?.totalProfits}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}