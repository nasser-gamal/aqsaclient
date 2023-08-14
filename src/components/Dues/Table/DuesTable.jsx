/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteDuesMutation } from '../../../app/features/dues/duesApi';

export default function DuesTable({ data }) {
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


  const [deleteDues, { isLoading }] = useDeleteDuesMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (treasuryId) => {
    try {
      const response = await deleteDues(treasuryId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.map(due => {
            return <tr key={due.id}>
              <td>
                <DateAndTime createdAt={due.date} />
              </td>
              <td>{due.amount}</td>
              <td>{due.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditDues',
                    modalTitle: 'تعديل ',
                    status: 'تعديل',
                    childrenProps: { due }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(due.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
