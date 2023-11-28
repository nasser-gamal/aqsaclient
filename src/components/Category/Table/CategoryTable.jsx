/* eslint-disable react/prop-types */

import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

import { useDeleteCategoryMutation } from '../../../app/features/category/categoryApi';

import CustomTable from '../../common/CustomTable/CustomTable';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';

export default function CategoryTable({ data }) {


  const theads = [
    {
      title: "اسم الخدمة",
      className: "sort",
      order: "name",
      sort: "DESC",
    },
    {
      title: "ملحوظة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "التاريخ",
      className: "sort",
      order: "createdAt",
      sort: "DESC",
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


  const [deleteCategory] = useDeleteCategoryMutation();



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        {element.name}
      </Table.Td>
      <Table.Td>
        {element.note || "-"}
      </Table.Td>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>
        <Button
          size="xs"
          type="button"
          disabled={element?.isDeleted}

          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditCategory',
              title: 'تعديل بيانات الخدمة',
              innerProps: { status: 'edit', data: element }
            })
          }
        >
          تعديل
        </Button>
      </Table.Td>
      <Table.Td>
        <DeleteModal
          title={'حذف الخدمة'}
          disabled={element?.isDeleted}

          text='هل أنت متأكد من حذف الخدمة ؟'
          handleDelete={deleteCategory}
          id={element.id}
          onCancel={() => console.log('Cancel')}
        />
      </Table.Td>
    </Table.Tr >
  ));



  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
