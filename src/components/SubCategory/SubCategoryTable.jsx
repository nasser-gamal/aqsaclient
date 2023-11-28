/* eslint-disable react/prop-types */

import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';


import CustomTable from '../common/CustomTable/CustomTable';
import DateAndTime from '../UI/DateAndTime/DateAndTime';
import DeleteModal from '../UI/DeleteModal/DeleteModal';
import { useDeleteSubCategoryMutation } from '../../app/features/subCategory/subCategoryApi';

export default function SubCategoryTable({ data }) {


  const theads = [
    {
      title: "الخدمة",
      className: "sort",
      order: "name",
      sort: "DESC",
    },
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


  const [deleteSubCategory] = useDeleteSubCategoryMutation();



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        {element.name}
      </Table.Td>
      <Table.Td>
        {element?.category?.name}
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
              modal: 'AddEditSubCategory',
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
          handleDelete={deleteSubCategory}
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
