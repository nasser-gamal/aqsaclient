/* eslint-disable react/prop-types */

import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';
import CustomTable from '../../common/CustomTable/CustomTable';
import { useDeleteFeeMutation } from '../../../app/features/fees/feesApi';

export default function FeesTable({ data }) {

  const theads = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "القيمة",
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

  const [deleteFee] = useDeleteFeeMutation();

  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>
      <Table.Td>
        <Button
          size="xs"
          type="button"
          disabled={element?.isDeleted}

          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditFees',
              title: 'تعديل مصاريف ',
              innerProps: { status: 'edit', data: element }
            })
          }
        >
          تعديل
        </Button>
      </Table.Td>
      <Table.Td>
        <DeleteModal
          disabled={element?.isDeleted}

          title={'حذف حساب'}
          text='هل أنت متأكد من حذف الحساب ؟'
          handleDelete={deleteFee}
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
