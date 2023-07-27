/* eslint-disable react/prop-types */

import Table from '../../../common/Table/Table';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';

export default function FeesReportTable({ data }) {

  const tableHead = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "القيمة",
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


  return (
    <div className='report-table'>
      <Table tableHead={tableHead}>
        <tbody>
          {
            data?.fees?.fees.map(fee => {
              return <tr key={fee.id}>
                <td className='date'>
                  <DateAndTime createdAt={fee.createdAt} />
                </td>
                <td>
                  {fee.amount}
                </td>
                <td>
                  {fee.note || "-"}
                </td>
              </tr>
            })
          }
          <tr className='last-child'>
            <td >
              الاجمالي
            </td>
            <td>
              {data?.totalFees}
            </td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
