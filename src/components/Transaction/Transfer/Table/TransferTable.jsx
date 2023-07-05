
import DeleteButton from '../../../UI/TableButtons/DeleteButton';
import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';


export default function TransferTable() {


  const tableHead = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "نوع العملية",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "قيمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المحول منه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "المحول إليه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: " المحول منه قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: " المحول منه بعد",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: " المحول إليه قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: " المحول إليه بعد",
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
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "حذف",
      className: "",
      order: "",
      sort: "",
    },
  ]

  return (
    <Table tableHead={tableHead}>
      <tbody>
        <tr>
          <td>10/2/22</td>
          <td>تسوية</td>
          <td>البنك الاهلي</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>
            <EditButton
              editProps={{
                name: 'AddEditTransfer',
                modalTitle: 'تعديل العملية',
                status: 'تعديل',
                childrenProps: { id: 1 }
              }}
            />
          </td>
          <td>
            <DeleteButton
              deleteProps={{
                name: 'DeleteConfirm',
                modalTitle: 'حذف عملية',
                status: 'حذف',
                childrenProps: { id: 1, message: 'هل أنت متأكد أنك تريد حذف هذا الحساب ؟' }
              }}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
