/* eslint-disable react/prop-types */

import Table from '../../../common/Table/Table';

export default function CommissionsReportTable({ data }) {

  const tableHead = [
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


  return (
    <div className='report-table'>
      <Table tableHead={tableHead}>
        <tbody>
          {
            data?.commissions.map((comission, index) => {
              return <tr key={index}>
                <td>
                  {comission?.agent.userName}
                </td>
                <td>
                  {Number(comission.commissions).toFixed(2)}
                </td>
              </tr>
            })
          }
          <tr className='last-child'>
            <td colSpan={1}>
              الاجمالي
            </td>
            <td>
              {data?.totalCommission}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
