/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Table from '../../common/Table/Table';
import SwitchActive from '../../common/Toggle/SwitchActive';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import EditButton from '../../UI/TableButtons/EditButton';
import UpdatePasswordButton from '../../UI/TableButtons/UpdatePasswordButton';


import { useUpdateUserStatusMutation } from '../../../app/features/user/userApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import { openModal } from '../../../app/features/modal/modalSlice';

import { CgMoreR } from 'react-icons/cg';

export default function UserTable({ users, isLoading }) {

  const dispatch = useDispatch();

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
    // {
    //   title: "عرض",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
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
    {
      title: "الرقم السري",
      className: "",
      order: "",
      sort: "",
    },

  ]



  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);



  const [updateUserStatus] = useUpdateUserStatusMutation()


  const updateStatus = async (userId) => {
    try {
      await updateUserStatus(userId).unwrap();
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
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
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
              {/* <td>
                <CgMoreR
                  style={{
                    fontSize: "24px",
                    color: "#081871",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    dispatch(openModal(
                      {
                        name: 'UserTransaction',
                        modalTitle: 'أخر 5 عمليات',
                        status: 'show',
                        childrenProps: { id: user.id }
                      }
                    ))}
                />
              </td> */}
              <td >
                <EditButton
                  editProps={{
                    name: 'AddEditUser',
                    modalTitle: 'تعديل الموظف',
                    status: 'تعديل',
                    childrenProps: { user: user }
                  }} />
              </td>
              <td>
                <DeleteButton
                  deleteProps={{
                    name: 'DeleteConfirm',
                    modalTitle: 'حذف موظف',
                    status: 'حذف',
                    childrenProps: {
                      id: user.id,
                      message: 'هل أنت متأكد أنك تريد حذف هذا الموظف ؟',
                      // deleteRequest: deleteAgent,
                      // isLoading: agentLoading
                    }
                  }} />
              </td>
              <td>
                <UpdatePasswordButton
                  name={'UpdateUserPassword'}
                  id={user.id}
                />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}