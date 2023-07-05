/* eslint-disable react/prop-types */
import Table from '../../../common/Table/Table';

export default function AgentInfoTable({ user, month }) {

  const tableHead = [
    {
      title: "الكود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الاسم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "البطاقة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الموبايل",
      className: "",
      order: "",
      sort: "",
    },
  
    {
      title: "البيان",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "العنوان",
      className: "",
      order: "",
      sort: "",
    },
  ];






  return (
    <div className="user-info">
      <Table tableHead={tableHead}>
        <tbody>
          <tr>
            <td>
              {user.accountNumber}
            </td>
            <td>
              {user.userName}
            </td>
            <td>
              {user.nationalId}
            </td>
            <td>
              {user.phoneNumber}
            </td>
            <td>
              عمولة شهر {month}
            </td>
            <td>
              {user.address}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
