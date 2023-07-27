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
                  {fee?.creator.userName}
                </td>
                <td>
                  {fee.note || "-"}
                </td>
                <td>
                  {fee.amount}
                </td>
              </tr>
            })
          }
          <tr className='last-child'>
            <td  colSpan={3}>
              الاجمالي
            </td>
            <td>
              {data?.totalFees}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
