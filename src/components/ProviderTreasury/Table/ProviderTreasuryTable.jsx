/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteProviderTreasuryMutation } from '../../../app/features/providerTreasury/providerTreasuryApi';

export default function ProviderTreasuryTable({ data }) {
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


  const [deleteProviderTreasury, { isLoading }] = useDeleteProviderTreasuryMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (treasuryId) => {
    try {
      const response = await deleteProviderTreasury(treasuryId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.map(providerTreasury => {
            return <tr key={providerTreasury.id}>
              <td>
                <DateAndTime createdAt={providerTreasury.date} />
              </td>
              <td>{providerTreasury.amount}</td>
              <td>{providerTreasury.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditProviderTreasury',
                    modalTitle: 'تعديل حساب المزود ',
                    status: 'تعديل',
                    childrenProps: { providerTreasury }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(providerTreasury.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
