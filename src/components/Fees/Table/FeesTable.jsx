/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useDeleteFeeMutation } from '../../../app/features/fees/feesApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';

export default function FeesTable({ data }) {
  const dispatch = useDispatch();

  const tableHead = [
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


  const [deleteFee, { isLoading }] = useDeleteFeeMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (feesId) => {
    try {
      const response = await deleteFee(feesId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.fees.map(fee => {
            return <tr key={fee.id}>
              <td>
                <DateAndTime createdAt={fee.date} />
              </td>
              <td>{fee.amount}</td>
              <td>{fee.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditFees',
                    modalTitle: 'تعديل الحساب',
                    status: 'تعديل',
                    childrenProps: { fee }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(fee.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
