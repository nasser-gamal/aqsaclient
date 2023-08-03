/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteProviderMutation } from '../../../app/features/provider/providerApi';

export default function ProviderTable({ data }) {
  const dispatch = useDispatch();

  const tableHead = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اسم المزود",
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


  const [deleteProvider, { isLoading }] = useDeleteProviderMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (providerId) => {
    try {
      const response = await deleteProvider(providerId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.provider.map(provider => {
            return <tr key={provider.id}>
              <td>
                <DateAndTime createdAt={provider.createdAt} />
              </td>
              <td>{provider.name}</td>
              <td>{provider.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditProvider',
                    modalTitle: 'تعديل الحساب',
                    status: 'تعديل',
                    childrenProps: { provider }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(provider.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
