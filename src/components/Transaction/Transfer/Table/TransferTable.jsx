/* eslint-disable react/prop-types */

import { modals } from '@mantine/modals';
import { Button, NumberFormatter, Table } from '@mantine/core';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import { useDeleteTransferMutation } from '../../../../app/features/transaction/transferApi';
import DeleteModal from '../../../UI/DeleteModal/DeleteModal';
import CustomTable from '../../../common/CustomTable/CustomTable';


export default function TransferTable({ data }) {

  const theads = [
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "قيمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المحول منه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرصيد قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الرصيد بعد",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "المحول إليه",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرصيد قبل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الرصيد بعد",
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


  const [deleteTransfer] = useDeleteTransferMutation();


  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.amountTotal} />
      </Table.Td>
      <Table.Td>
        {element?.sender?.accountName || 'غير معروف'}
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceSenderBefore} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceSenderAfter} />
      </Table.Td>
      <Table.Td>
        {element?.recipient?.accountName || 'غير معروف'}
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceRecipientBefore} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceRecipientAfter} />
      </Table.Td>
      <Table.Td>
        {element.note || "-"}
      </Table.Td>
      <Table.Td>
        <Button
          type="button"
          disabled={element?.isDeleted}
          size="xs"
          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditTransfer',
              title: 'تعديل بيانات',
              innerProps: { status: 'edit', data: element }
            })
          }
        >
          تعديل
        </Button>
      </Table.Td>
      <Table.Td>
        <DeleteModal
          title={'حذف حساب'}
          disabled={element?.isDeleted}
          text='هل أنت متأكد من حذف الحساب ؟'
          handleDelete={deleteTransfer}
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
