/* eslint-disable react/prop-types */

import Table from '../../common/Table/Table';
import SwitchActive from '../../common/Toggle/SwitchActive';

import EditButton from '../../UI/TableButtons/EditButton';
// import DeleteButton from '../../UI/TableButtons/DeleteButton';
import UpdatePasswordButton from '../../UI/TableButtons/UpdatePasswordButton';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';

import { useUpdateAgentStatusMutation } from '../../../app/features/user/agentApi';

export default function AgentTable({ users, isLoading }) {


  const tableHead = [
    {
      title: "اسم صاحب الحساب",
      className: "user-name",
      order: "userName",
      sort: "ASC",
    },
    {
      title: "اسم الحساب",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "رقم الحساب",
      className: "account-number",
      order: "accountNumber",
      sort: "ASC",
    },
    {
      title: "رقم الموبايل",
      className: "phone",
      order: "phoneNumber",
      sort: "ASC",
    },

    {
      title: "البريد الالكتروني",
      className: "email",
      order: "email",
      sort: "ASC",
    },
    {
      title: "الرقم القومي",
      className: "national-id",
      order: "nationalId",
      sort: "ASC",
    },

    {
      title: "العنوان",
      className: "address",
      order: "address",
      sort: "ASC",
    },
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "حالةالحساب",
      className: "is-active",
      order: "isActive",
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
    // {
    //   title: "الرقم السري",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
  ];


  const [updateAgentStatus] = useUpdateAgentStatusMutation()


  const updateStatus = async (agentId) => {
    try {
      await updateAgentStatus(agentId).unwrap();
    } catch (err) {
      console.log(err)
    }
  }


  



  return (
    <Table tableHead={tableHead} isLoading={isLoading}>
      <tbody>
        {
          users?.map(user => {
            return <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.accountName}</td>
              <td>{user.accountNumber}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.nationalId}</td>
              <td>{user.address}</td>
              <td>
                <DateAndTime createdAt={user.createdAt} />
              </td>
              <td>
                <SwitchActive
                  active={user.isActive ? true : false}
                  onClick={() => updateStatus(user.id)}
                />
              </td>
              <td >
                <EditButton
                  editProps={{
                    name: 'AddEditAgent',
                    modalTitle: 'تعديل الوكيل',
                    status: 'تعديل',
                    childrenProps: { user: user }
                  }} />
              </td>
              {/* <td>
                <DeleteButton
                  deleteProps={{
                    name: 'DeleteConfirm',
                    modalTitle: 'حذف وكيل',
                    status: 'حذف',
                    childrenProps: {
                      id: user.id,
                      message: 'هل أنت متأكد أنك تريد حذف هذا الوكيل ؟',
                      deleteRequest: deleteAgent,
                      isLoading: agentLoading
                    }
                  }} />
              </td> */}
              <td>
                <UpdatePasswordButton name={'UpdateAgentPassword'} id={user.id} />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
