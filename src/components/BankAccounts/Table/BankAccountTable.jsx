/* eslint-disable react/prop-types */

import { useDeleteBankAccountMutation } from '../../../app/features/bankAccount/bankAccountApi';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../UI/DeleteModal/DeleteModal';
import CustomTable from '../../common/CustomTable/CustomTable';
import { Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

export default function BankAccountTable({ data }) {

  const theads = [
    {
      title: "رقم الحساب",
      className: "account-number",
      order: "accountNumber",
      sort: "ASC",
    },

    {
      title: "اسم الحساب",
      className: "bank",
      order: "bank",
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
  ];

  const [deleteBankAccount] = useDeleteBankAccountMutation()

  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>{element.bankNumber}</Table.Td>
      <Table.Td>{element.accountName}</Table.Td>
      <Table.Td>{element.bank?.bankName}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      <Table.Td>{element.note || "-"}</Table.Td>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>
        <Button
          size="xs"
          disabled={element?.isDeleted}

           type="button"
          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditBankAccount',
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
          handleDelete={deleteBankAccount}
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
