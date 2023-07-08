/* eslint-disable react/prop-types */
import Table from '../../../common/Table/Table';


export default function AgentCommissisonTable({ data }) {
  const tableHead = [
    {
      title: "الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "القيمة الاجمالية",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الشريحة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "نسبة العمولة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "قيمة العمولة",
      className: "",
      order: "",
      sort: "",
    },
  ];



  return (
    <Table tableHead={tableHead}>
      <tbody>

        {
          data?.commissions.map(commission => {
            return <tr key={commission.id}>
              <td className='service'>
                {commission.segment.service.name}
              </td>
              <td className='amount-total'>
                {commission.amountTotal}
              </td>
              <td className='segment'>
                {commission.segment.title}
              </td>
              <td className='percentage'>
                {(commission.segment.percentage) + "%"}
              </td>
              <td className='commission'>
                {commission.commission}
              </td>
            </tr>
          })
        }
        <tr>
          <td>الاجمالي</td>
          <td>
            {data?.totalAmount}
          </td>
          <td>

          </td>
          <td>
            الاجمالي
          </td>
          <td>
            {data?.totalCommissions}
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
