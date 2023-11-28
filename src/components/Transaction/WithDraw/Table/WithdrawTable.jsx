/* eslint-disable react/prop-types */
import { modals } from '@mantine/modals';
import { Button, NumberFormatter, Table } from '@mantine/core';

import moreImg from '../../../../assets/icons/add-button.png'

import { useDeleteWithDrawMutation } from '../../../../app/features/transaction/withDrawApi';

import ResotreButton from '../../../UI/RestoreData/ResotreButton';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../../UI/DeleteModal/DeleteModal';
import CustomTable from '../../../common/CustomTable/CustomTable';

export default function WithdrawTable({ data }) {
  const theads = [
    {
      title: "رقم الفاتورة",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
      sort: "ASC",
    },
    {
      title: "الحساب",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "الرقم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رصيد قبل",
      className: "",
      order: "",
      sort: "ASC",
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
      title: "رصيد بعد",
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
      title: "#",
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



  const [deleteWithDraw] = useDeleteWithDrawMutation();


  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>      <Table.Td>
      {element.id}
    </Table.Td>
      <Table.Td className='date'>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>
        {element?.bankAccount?.accountName || 'غير معروف'}
      </Table.Td>
      <Table.Td>
        {element.number}
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceBefore} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.amount} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.providerFees} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.amountTotal} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceAfter} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.providerRevenue} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.profit} />
      </Table.Td>
      <Table.Td>
        {element.note || "-"}
      </Table.Td>
      <Table.Td>
        <img style={{
          'width': '28px',
          'cursor': 'pointer',
        }} src={moreImg} alt={moreImg}
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditWithdraw',
              title: 'عرض عملية ايداع',
              innerProps: { status: 'show', data: element, show: true }
            })
          }
        />
      </Table.Td>
      {element.isDeleted ? <>
        <td colSpan={'2'}>
          <ResotreButton
            type={'withDraw'}
            transactionId={element.id}
          />
        </td>
      </> :
        <>
          <Table.Td>
            <Button
              type="button"
              size="xs"
              color="rgba(13, 148, 45, 1)"
              onClick={() =>
                modals.openContextModal({
                  modal: 'AddEditWithdraw',
                  title: 'تعديل عملية سحب',
                  innerProps: { status: 'edit', data: element },
                })
              }
            >
              تعديل
            </Button>
          </Table.Td>
          <Table.Td>
            <DeleteModal
              title={'حذف عملية'}
              text='هل أنت متأكد من حذف العملية ؟'
              handleDelete={deleteWithDraw}
              id={element.id}
              onCancel={() => console.log('Cancel')}
            />
          </Table.Td>
        </>
      }
    </Table.Tr >
  ));



  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
