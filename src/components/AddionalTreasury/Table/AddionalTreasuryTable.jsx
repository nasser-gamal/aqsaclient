/* eslint-disable react/prop-types */
import { modals } from '@mantine/modals';
import { Button, Table } from '@mantine/core';

import { useDeleteAddionalTreasuryMutation } from '../../../app/features/addionalTreasury/addionalTreasuryApi';

import CustomTable from '../../common/CustomTable/CustomTable';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import ResotreButton from '../../UI/RestoreData/ResotreButton';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';



export default function AddionalTreasuryTable({ data }) {

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


  const [deleteAddionalTreasury] = useDeleteAddionalTreasuryMutation();





  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>

      <>
        <Table.Td>
          <Button
            disabled={element?.isDeleted}

            type="button"
            size="xs"
            color="rgba(13, 148, 45, 1)"
            onClick={() =>
              modals.openContextModal({
                modal: 'AddEditAddionalTreasury',
                title: 'تعديل رصيد',
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

            title={'حذف رصيد'}
            text='هل أنت متأكد من حذف الرصيد ؟'
            handleDelete={deleteAddionalTreasury}
            id={element.id}
            onCancel={() => console.log('Cancel')}
          />
        </Table.Td>
      </>
    </Table.Tr >
  ));



  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
