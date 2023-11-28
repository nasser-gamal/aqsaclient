/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';


import { useUpdateUserStatusMutation } from '../../../app/features/user/userApi';
import { useEffect, useState } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import CustomTable from '../../common/CustomTable/CustomTable';
import { Button, Menu, Switch, Table } from '@mantine/core';
import { modals } from '@mantine/modals';


import {
  IconSettings,
  // IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  // IconArrowsLeftRight,
} from '@tabler/icons-react';
import DeleteUser from '../DeleteUser/DeleteUser';
import { useDisclosure } from '@mantine/hooks';

export default function UserTable({ data, isLoading }) {
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch();

  const theads = [
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
      title: "الرقم القومي",
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
      title: "الصلاحية",
      className: "",
      order: "",
      sort: "",
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
    //   title: "تغير الرقم السري",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    // {
    //   title: "ارسال الرقم السري",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    // {
    //   title: "تعديل",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    // {
    //   title: "حذف",
    //   className: "",
    //   order: "",
    //   sort: "",
    // },
    {
      title: "#",
      className: "",
      order: "",
      sort: "",
    },


  ]
  const [id, setId] = useState()

  const [updateUserStatus, { isLoading: updateLoading }] = useUpdateUserStatusMutation()


  useEffect(() => {
    if (isLoading || updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, updateLoading]);




  const updateStatus = async (userId) => {
    try {
      await updateUserStatus(userId).unwrap();
    } catch (err) {
      console.log(err)
    }
  }



  const rows = data?.map((element) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>{element.userName}</Table.Td>
      <Table.Td>{element.accountName}</Table.Td>
      <Table.Td>{element.phoneNumber}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.nationalId || '-'}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.role?.nameAr}</Table.Td>
      <Table.Td>
        <DateAndTime createdAt={element.createdAt} />
      </Table.Td>
      <Table.Td>
        <Switch
          disabled={element?.isDeleted}
          checked={element.isActive ? true : false}
          onChange={() => updateStatus(element.id)}
        />
      </Table.Td>
      {/* <Table.Td >
        <Button
          type="button"
          size="xs"
          color="rgba(13, 148, 45, 1)"
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditUser',
              title: 'تعديل الموظف',
              innerProps: { status: 'edit', data: element }
            })
          }
        >
          تعديل
        </Button>
      </Table.Td> */}
      {/* <Table.Td>
        <DeleteModal
          title={'حذف حساب'}
          text='هل أنت متأكد من حذف الحساب ؟'
          handleDelete={deleteUser}
          id={element.id}
          onCancel={() => console.log('Cancel')}
        />
      </Table.Td> */}
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target >
            <Button
              disabled={element?.isDeleted}
              type="button"
              size="xs"
            >المزيد</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>الاعدادات</Menu.Label>
            <Menu.Item
              leftSection={<IconSettings color='blue' style={{ width: "20px", height: "20px" }} />}
              onClick={() =>
                modals.openContextModal({
                  modal: 'AddEditUser',
                  title: 'تعديل المستخدم',
                  innerProps: { status: 'edit', data: element }
                })
              }
            >
              تعديل بيانات الحساب
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSettings color='blue' style={{ width: "20px", height: "20px" }} />}
              onClick={() =>
                modals.openContextModal({
                  modal: 'UpdateUserPasswordManual',
                  title: 'تغير الرقم السري للمستخدم',
                  innerProps: { id: element.id }
                })
              }
            >
              تغير كلمة السر
            </Menu.Item>
            <Menu.Item
              leftSection={<IconMessageCircle color='blue' style={{ width: "20px", height: "20px" }} />}
              onClick={() =>
                modals.openContextModal({
                  modal: 'UpdateUserPassword',
                  title: 'ارسال الرقم السري برسالة',
                  innerProps: { id: element.id }
                })
              }
            >
              ارسال كلمة السر
            </Menu.Item>
            <Menu.Item
              leftSection={<IconPhoto color='blue' style={{ width: "20px", height: "20px" }} />}
            >
              ارسال رسالة
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item
              color="red"
              leftSection={<IconTrash style={{ width: "rem(14)", height: "rem(14)" }} />}
              // onClick={() =>
              //   modals.openContextModal({
              //     modal: 'DeleteUser',
              //     title: 'حذف المستخدم',
              //     innerProps: { status: 'delete', data: element }
              //   })
              // }
              onClick={() => {
                setId(element.id)
                open()
              }}
            >
              حذف  الحساب
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>

      {/* <Table.Td>
        <UpdatePasswordButton
          name={'UpdateUserPasswordManual'}
          id={element.id}
        />
      </Table.Td>
      <Table.Td>
        <UpdatePasswordButton
          name={'UpdateUserPassword'}
          id={element.id}
        />
      </Table.Td> */}
    </Table.Tr >
  ));


  return (
    <>
      <CustomTable theads={theads} rows={rows} />
      <DeleteUser
        opened={opened}
        close={close}
        title="حذف موظف"
        id={id}
      />
    </>
  )
}