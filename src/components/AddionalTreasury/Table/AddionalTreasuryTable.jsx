/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteAddionalTreasuryMutation } from '../../../app/features/addionalTreasury/addionalTreasuryApi';

export default function AddionalTreasuryTable({ data }) {
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


  const [deleteAddionalTreasury, { isLoading }] = useDeleteAddionalTreasuryMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (treasuryId) => {
    try {
      const response = await deleteAddionalTreasury(treasuryId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.map(addionalTreasury => {
            return <tr key={addionalTreasury.id}>
              <td>
                <DateAndTime createdAt={addionalTreasury.date} />
              </td>
              <td>{addionalTreasury.amount}</td>
              <td>{addionalTreasury.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditAddionalTreasury',
                    modalTitle: 'تعديل ',
                    status: 'تعديل',
                    childrenProps: { addionalTreasury }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(addionalTreasury.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
