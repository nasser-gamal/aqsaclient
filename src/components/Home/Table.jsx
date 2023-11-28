/* eslint-disable react/prop-types */


import DateAndTime from '../UI/DateAndTime/DateAndTime';
import { Button, NumberFormatter, Table } from '@mantine/core';
import { modals } from '@mantine/modals';

import moreImg from '../../assets/icons/add-button.png'
import CustomTable from '../common/CustomTable/CustomTable';
import ResotreButton from '../UI/RestoreData/ResotreButton';
import DeleteModal from '../UI/DeleteModal/DeleteModal';
import { useDeleteDepositeMutation } from '../../app/features/transaction/depositeApi';
import { useDeleteWithDrawMutation } from '../../app/features/transaction/withDrawApi';
import { useDispatch } from 'react-redux';


import { openModal } from '../../app/features/modal/modalSlice'

export default function BankReportTable({ data, reports }) {


  const theads = [
    // {
    //   title: "رقم الفاتورة",
    //   className: "",
    //   order: "",
    //   sort: "ASC",
    // },
    {
      title: "التاريخ",
      className: "created-at",
      order: "createdAt",
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


  const dispatch = useDispatch()
  const [deleteDeposite] = useDeleteDepositeMutation()
  const [deleteWithDraw] = useDeleteWithDrawMutation()



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td className='date'>
        <DateAndTime createdAt={element.date} />
      </Table.Td>
      <Table.Td>
        {element.number}
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={element.balanceBefore} />
      </Table.Td>
      <Table.Td>
        {element.type === 'ايداع' ? <NumberFormatter thousandSeparator value={element.amountTotal} /> : 0}
      </Table.Td>
      <Table.Td>
        {element.type === 'سحب' &&
          (element.balanceBefore - element.balanceAfter).toFixed(2) == element.amountTotal.toFixed(2) ?
          <NumberFormatter thousandSeparator value={element.amountTotal} /> :
          element.type !== 'سحب' ? 0 : <NumberFormatter thousandSeparator value={element.providerDeduction} />
        }
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
        {element.note || "-"}
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
      {
        element.isDeleted ? <>
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
                  name: element.type === 'سحب' ? "AddEditWithdraw" : "AddEditDeposit",
                  modalTitle: element.type === 'سحب' ? 'تعديل بيانات العملية (سحب)' : 'تعديل بيانات العملية (ايداع)',
                  innerProps: {
                    data: element,
                    status: 'edit',
                    width: element.type === 'سحب' && '700px'
                  }
                }))}
              >
                تعديل
              </Button>
            </Table.Td>
            <Table.Td>
              <DeleteModal
                title={'حذف عملية'}
                text='هل أنت متأكد من حذف العملية ؟'
                handleDelete={element.type === 'سحب' ? deleteWithDraw : deleteDeposite}
                id={element.id}
                onCancel={() => console.log('Cancel')}
              />
            </Table.Td>
          </>
      }
    </Table.Tr >
  ));



  const tFoot =
    <Table.Tr>
      <Table.Td colSpan={3}>
        الاجمالى
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={reports?.depositTotal?.toFixed(2)} />
      </Table.Td>
      <Table.Td>
        <NumberFormatter thousandSeparator value={reports?.withdrawalTotal?.toFixed(2)} />
      </Table.Td>
      <Table.Td colSpan={8}>
      </Table.Td>
    </Table.Tr>
  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} />
  )
}
