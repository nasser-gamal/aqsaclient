
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';


export default function BankTable() {


  const tableHead = [
    {
      title: "اسم البنك",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "الحسابات",
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
          <td>البنك الاهلي</td>
          <td>10 حسابات</td>
          <td>ملحوظة</td>
          <td>1000/222</td>
          <td>
            <EditButton
              editProps={{
                name: 'AddEditBankAccount',
                modalTitle: 'تعديل الحساب',
                status: 'تعديل',
                childrenProps: { id: 1 }
              }}
            />
          </td>
          <td>
            <DeleteButton
              deleteProps={{
                name: 'DeleteConfirm',
                modalTitle: 'حذف حساب',
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
