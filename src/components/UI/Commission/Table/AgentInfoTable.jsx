/* eslint-disable react/prop-types */
import Table from '../../../common/Table/Table';

export default function AgentInfoTable({ user }) {

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
              {user.agent.accountNumber}
            </td>
            <td>
              {user.agent.userName}
            </td>
            <td>
              {user.agent.nationalId}
            </td>
            <td>
              {user.agent.phoneNumber}
            </td>
            <td>
              عمولة شهر {user.month}
            </td>
            {/* <td>
              سنة  {user.year}
            </td> */}
            <td>
              {user.agent.address}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
