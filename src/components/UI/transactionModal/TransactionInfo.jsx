import { useSelector } from "react-redux"
import Table from "../../common/Table/Table";

export default function TransactionInfo() {

  const { childrenProps } = useSelector(state => state.modal)

  const tableHead = [
    {
      title: "رسوم اخري",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "عوائد اخري",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "المخصوم من مزود الخدمة",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "المخصوم من المركز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عائد المخصوم من المركز",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "اجمالي المخصوم من المركز",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "بواسطة",
      className: "",
      order: "",
      sort: "ASC",
    },
  ]

  return (
    <div>
      <div className="text-center" style={{ padding: '10px 0' }}>
        <span>
          بيانات العملية رقم {childrenProps?.transaction.id}
        </span>
      </div>
      <Table tableHead={tableHead}>
        <tbody>
          <tr>
            <td>{childrenProps?.transaction.additionalFees || 0}</td>
            <td>{childrenProps?.transaction.additionalRevenue || 0}</td>
            <td>{childrenProps?.transaction.providerRevenue}</td>
            <td>{childrenProps?.transaction.agentDeduction || 0}</td>
            <td>{childrenProps?.transaction.agentRevenue || 0}</td>
            <td>{childrenProps?.transaction.agentTotalDeduction || 0}</td>
            <td>{childrenProps?.transaction.creator.userName}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
