
import Table from '../../common/Table/Table';


import EditButton from '../../UI/TableButtons/EditButton';
import DeleteButton from '../../UI/TableButtons/DeleteButton';

export default function BankAccountTable() {


  const tableHead = [
    {
      title: "اسم الحساب",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "رقم الحساب",
      className: "account-number",
      order: "accountNumber",
      sort: "ASC",
    },
    {
      title: "البنك",
      className: "bank",
      order: "bank",
      sort: "ASC",
    },
    {
      title: "المبلغ الحالي",
      className: "balance",
      order: "balance",
      sort: "ASC",
    },
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "",
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
          <td>حساب1</td>
          <td>حساب1</td>
          <td>البنك الاهلي</td>
          <td>1000,22</td>
          <td>1000,22</td>
          <td>
            10/2/11
          </td>
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
