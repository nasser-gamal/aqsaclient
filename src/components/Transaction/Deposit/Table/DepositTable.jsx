/* eslint-disable react/prop-types */


import { Button, NumberFormatter, Table } from '@mantine/core';

import moreImg from '../../../../assets/icons/add-button.png'
import { useDeleteDepositeMutation } from '../../../../app/features/transaction/depositeApi';
import ResotreButton from '../../../UI/RestoreData/ResotreButton';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import DeleteModal from '../../../UI/DeleteModal/DeleteModal';
import CustomTable from '../../../common/CustomTable/CustomTable';
import { openModal } from '../../../../app/features/modal/modalSlice';
import { useDispatch } from 'react-redux';

export default function DepositTable({ data, }) {

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
  ];

  const dispatch = useDispatch()

  const [deleteDeposite] = useDeleteDepositeMutation();

  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>      <Table.Td>
      {element.id}
    </Table.Td>
      <Table.Td>
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
          onClick={() => dispatch(openModal({
            name: "AddEditDeposit",
            modalTitle: 'عرض بيانات العملية',
            status: 'عرض',
            innerProps: { data: element, show: true }
          }))}
        />
      </Table.Td>
      {element.isDeleted ? <>
        <td colSpan={'2'}>
          <ResotreButton
            type={'deposite'}
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
              onClick={() => dispatch(openModal({
                name: "AddEditDeposit",
                modalTitle: 'تعديل العملية',
                innerProps: { data: element, status: 'edit' }
              }))}
            >
              تعديل
            </Button>
          </Table.Td>
          <Table.Td>
            <DeleteModal
              title={'حذف عملية'}
              text='هل أنت متأكد من حذف العملية ؟'
              handleDelete={deleteDeposite}
              id={element.id}
              onCancel={() => console.log('Cancel')}
            />
          </Table.Td>
        </>}
    </Table.Tr >
  ));

  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
