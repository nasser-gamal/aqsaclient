/* eslint-disable react/prop-types */
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import CustomTable from '../../common/CustomTable/CustomTable';
import { Button, Table } from '@mantine/core';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';
import { modals } from '@mantine/modals';
import { useDeleteBankMutation } from '../../../app/features/bank/bankApi';

export default function BankTable({ data }) {


  const theads = [
    {
      title: "اسم البنك",
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
    {
      title: "حذف",
      className: "",
      order: "",
      sort: "",
    },
  ]

  const [deleteBank] = useDeleteBankMutation();

  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>{element.bankName}</Table.Td>
      <Table.Td>{element.note}</Table.Td>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td >
        <Button
          type="button"
          disabled={element?.isDeleted}

          size="xs"
          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditBank',
              title: 'تعديل بيانات البنك',
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
          handleDelete={deleteBank}
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
