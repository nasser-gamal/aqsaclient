/* eslint-disable react/prop-types */

import DateAndTime from '../../UI/DateAndTime/DateAndTime';
// import DeleteButton from '../../UI/TableButtons/DeleteButton';
import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';


export default function CategoryTable({ categories, isLoading }) {


  const tableHead = [
    {
      title: "اسم الخدمة",
      className: "account-name",
      order: "accountName",
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
  ]


  return (
    <Table tableHead={tableHead} isLoading={isLoading}>
      <tbody>
        {
          categories?.map(category => {
            return <tr key={category.id}>
              <td>
                {category.name}
              </td>
              <td>
                {category.note || "-"}
              </td>
              <td>
                <DateAndTime createdAt={category.createdAt} />
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditCategory',
                    modalTitle: 'تعديل الخدمة',
                    status: 'تعديل',
                    childrenProps: { category }
                  }}
                />
              </td>
              {/* <td>
                <DeleteButton
                  deleteProps={{
                    name: 'DeleteConfirm',
                    modalTitle: 'حذف خدمة',
                    status: 'حذف',
                    childrenProps: { id: category.id, message: 'هل أنت متأكد أنك تريد حذف هذه الخدمة ؟' }
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
