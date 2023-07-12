/* eslint-disable react/prop-types */
import Table from '../../common/Table/Table';


export default function AgentSegmentsTable({ segments, isLoading }) {


  const tableHead = [
    {
      title: "الشريحة",
      className: "title",
      order: "title",
      sort: "ASC",
    },
    {
      title: "اسم الخدمة",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "من",
      className: "start",
      order: "start",
      sort: "ASC",
    },
    {
      title: "إلي",
      className: "end",
      order: "end",
      sort: "ASC",
    },
    {
      title: "النسبة",
      className: "",
      order: "",
      sort: "ASC",
    },
  ];


  return (
    <Table tableHead={tableHead} isLoading={isLoading}>
      <tbody>
        {
          segments?.map((segment) => {
            return <tr key={segment.id}>
              <td>{segment.title}</td>
              <td>{segment.service.name}</td>
              <td>{segment.start}</td>
              <td>{segment.end || "-"}</td>
              <td>{(segment.percentage) + "%"}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
