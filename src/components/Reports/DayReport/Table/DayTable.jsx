/* eslint-disable react/prop-types */


import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import moreImg from '../../../../assets/icons/add-button.png'
import CustomTable from '../../../common/CustomTable/CustomTable';
import { NumberFormatter, Table } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../app/features/modal/modalSlice';



export default function DayTable({ data, reports }) {


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
      title: "ايداع",
      className: "",
      order: "",
      sort: "ASC",
    },
    {
      title: "سحب",
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
      title: "ملحوظة",
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
      title: "#",
      className: "",
      order: "",
      sort: "",
    },
  ]

  const dispatch = useDispatch()


  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td className='date'>
        {element.id}
      </Table.Td>
      <Table.Td className='date'>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>
        {element.number}
      </Table.Td>
      <Table.Td>
        {element?.bankAccount?.accountName}
      </Table.Td>
      <Table.Td>
        {element.balanceBefore}
      </Table.Td>
      <Table.Td>
        {element.type === 'ايداع' ? element.amountTotal : 0}
      </Table.Td>
      <Table.Td>
        {element.type === 'سحب' &&
          (element.balanceBefore - element.balanceAfter).toFixed(2) == element.amountTotal.toFixed(2) ?
          element.amountTotal :
          element.type !== 'سحب' ? 0 : element.providerDeduction}
      </Table.Td>
      <Table.Td>
        {element.amount}
      </Table.Td>
      <Table.Td>
        {element.providerFees}
      </Table.Td>
      <Table.Td>
        {element.amountTotal}
      </Table.Td>
      <Table.Td>
        {element.balanceAfter}
      </Table.Td>
      <Table.Td>
        {element.note || "-"}
      </Table.Td>
      <Table.Td>
        {element.providerRevenue}
      </Table.Td>
      <Table.Td>
        {element.profit}
      </Table.Td>
      <Table.Td>
        <img style={{
          'width': '28px',
          'cursor': 'pointer',
        }} src={moreImg} alt={moreImg}
          onClick={() => dispatch(openModal({
            name: element.type === 'سحب' ? "AddEditWithdraw" : "AddEditDeposit",
            modalTitle: element.type === 'سحب' ? 'عرض بيانات العملية (سحب)' : 'عرض بيانات العملية (ايداع)',
            innerProps: {
              data: element,
              show: true,
              width: element.type === 'سحب' && '700px'
            }
          }))}
        />
      </Table.Td>
    </Table.Tr >
  ));




  const tFoot =
    <Table.Tr>
      <Table.Td colSpan={5}>
        الاجمالى
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={reports?.totalDeposite} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={reports?.totalWithdraw} />
      </Table.Td>
      <Table.Td colSpan={6}>
      </Table.Td>
      <Table.Td >
        <NumberFormatter thousandSeparator value={reports?.profit} />
      </Table.Td>
      <Table.Td >
      </Table.Td>
    </Table.Tr>




  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} />
  )
}
