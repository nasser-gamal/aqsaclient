/* eslint-disable react/prop-types */

// import DeleteButton from '../../UI/TableButtons/DeleteButton';
import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';


export default function SegmentTable({ segments }) {


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
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "ASC",
    },
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
    // {
    //   title: "حذف",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
  ];


  return (
    <Table tableHead={tableHead} >
      <tbody>
        {
          segments?.map((segment) => {
            return <tr key={segment.id}>
              <td>{segment.title}</td>
              <td>{segment.service.name}</td>
              <td>{segment.start}</td>
              <td>{segment.end || "-"}</td>
              <td>{(segment.percentage) + "%"}</td>
              <td>{segment.note || "-"}</td>
              <td>
                <DateAndTime createdAt={segment.createdAt} />
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditSegment',
                    modalTitle: 'تعديل الشريحة',
                    status: 'تعديل',
                    childrenProps: { segment }
                  }}
                />
              </td>
              {/* <td>
                <DeleteButton
                  deleteProps={{
                    name: 'DeleteConfirm',
                    modalTitle: 'حذف الشريحة',
                    status: 'حذف',
                    childrenProps: { id: segment.id, message: 'هل أنت متأكد أنك تريد حذف هذه الشريحة ؟' }
                  }}
                />
              </td> */}
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
