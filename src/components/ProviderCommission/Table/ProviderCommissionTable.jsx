/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteProviderCommissionMutation } from '../../../app/features/provider/providerCommissions';

export default function ProviderCommissionTable({ data }) {
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
      title: "العمولة",
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


  const [deleteProviderCommission, { isLoading }] = useDeleteProviderCommissionMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (providerId) => {
    try {
      const response = await deleteProviderCommission(providerId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.providerCommissions.map(providerCommission => {
            return <tr key={providerCommission.id}>
              <td>
                <DateAndTime createdAt={providerCommission.date} />
              </td>
              <td>{providerCommission.provider.name}</td>
              <td>{providerCommission.commission}</td>
              <td>{providerCommission.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditProviderCommission',
                    modalTitle: 'تعديل الحساب',
                    status: 'تعديل',
                    childrenProps: { providerCommission }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(providerCommission.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
