/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { notify } from '../../../utils/notify';
import { useDeleteAgentTreasuryMutation } from '../../../app/features/agentTreasury/agentTreasuryApi';

export default function AgentTreasuryTable({ data }) {
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


  const [deleteAgentTreasury, { isLoading }] = useDeleteAgentTreasuryMutation();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  const handleDelete = async (agentTreasuryId) => {
    try {
      const response = await deleteAgentTreasury(agentTreasuryId).unwrap();
      notify('success', response.message);
    } catch (err) {
      notify('error', err.data.message);
    }
  }

  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.map(agentTreasury => {
            return <tr key={agentTreasury.id}>
              <td>
                <DateAndTime createdAt={agentTreasury.date} />
              </td>
              <td>{agentTreasury.amount}</td>
              <td>{agentTreasury.note || "-"}</td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditAgentTreasury',
                    modalTitle: 'تعديل ',
                    status: 'تعديل',
                    childrenProps: { agentTreasury }
                  }}
                />
              </td>
              <td>
                <DeleteButton onClick={() => handleDelete(agentTreasury.id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
