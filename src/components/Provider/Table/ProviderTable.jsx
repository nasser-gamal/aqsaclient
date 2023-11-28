/* eslint-disable react/prop-types */

import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';

import { useDeleteProviderMutation } from '../../../app/features/provider/providerApi';

import CustomTable from '../../common/CustomTable/CustomTable';


export default function ProviderTable({ data }) {

  const theads = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اسم المزود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "ASC",
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


  const [deleteProvider] = useDeleteProviderMutation();



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>
      <Table.Td>
        <Button
          type="button"
          disabled={element?.isDeleted}

          size="xs"
          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditProvider',
              title: 'تعديل المزود',
              innerProps: { status: 'edit', data: element }
            })
          }
        >
          تعديل
        </Button>
      </Table.Td>
      <Table.Td>
        <DeleteModal
          title={'حذف مزود'}
          disabled={element?.isDeleted}

          text='هل أنت متأكد من حذف المزود ؟'
          handleDelete={deleteProvider}
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
