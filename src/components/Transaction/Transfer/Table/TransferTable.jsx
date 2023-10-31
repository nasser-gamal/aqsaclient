/* eslint-disable react/prop-types */

import EditButton from '../../../UI/TableButtons/EditButton';
import Table from '../../../common/Table/Table';
import DateAndTime from '../../../UI/DateAndTime/DateAndTime';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { notify } from '../../../../utils/notify';
import DeleteButton from '../../../UI/TableButtons/DeleteButton';
import { useDeleteTransferMutation } from '../../../../app/features/transaction/transferApi';


export default function TransferTable({ transfers }) {
  const dispatch = useDispatch();

  const tableHead = [
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



  const [deleteTransfer, { isLoading }] = useDeleteTransferMutation();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (transactionId) => {
    try {
      const response = await deleteTransfer(transactionId).unwrap();
      notify('success', response.message)
    } catch (err) {
      notify('error', err.data.message)
    }
  }



  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          transfers?.map(transfer => {
            return <tr key={transfer.id}>
              <td>
                <DateAndTime createdAt={transfer.createdAt} />
              </td>
              <td>
                {transfer.amountTotal}
              </td>
              <td>
                {transfer?.sender?.accountName || 'غير معروف'}
              </td>
              <td>
                {transfer.balanceSenderBefore}
              </td>
              <td>
                {transfer.balanceSenderAfter}
              </td>
              <td>
                {transfer?.recipient?.accountName || 'غير معروف'}
              </td>
              <td>
                {transfer.balanceRecipientBefore}
              </td>
              <td>
                {transfer.balanceRecipientAfter}
              </td>
              <td>
                {transfer.note || "-"}
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditTransfer',
                    modalTitle: 'تعديل العملية',
                    status: 'تعديل',
                    childrenProps: { transfer }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(transfer.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
