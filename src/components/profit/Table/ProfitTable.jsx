/* eslint-disable react/prop-types */

import Table from '../../../components/common/Table/Table';


export default function ProfitTable({ data }) {


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
      title: "صافي الربح",
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
              {data?.totalDepoite}
            </td>
            <td>
              {data?.totalDepoiteCount}
            </td>
            <td>
              {data?.totalWithdraw}
            </td>
            <td>
              {data?.totalWithdrawCount}
            </td>
            <td>
              {data?.totalProfits}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
