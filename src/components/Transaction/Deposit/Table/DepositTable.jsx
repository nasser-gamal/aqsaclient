
import DeleteButton from '../../../UI/TableButtons/DeleteButton';
import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';


export default function DepositTable() {


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
      title: "البنك",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "رصيد قبل",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "رصيد بعد",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الرقم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "قيمة الفاتورة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رسوم المزود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الاجمالي",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عائد مزود الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المخصوم من المراكز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: " عائد المراكز",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "صافي الربح",
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
          <td>ملحوظة</td>
          <td>البنك الاهلي</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>1212/222</td>
          <td>1000/222</td>
          <td>1000/222</td>
          <td>
            <EditButton
              editProps={{
                name: 'AddEditDeposit',
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
