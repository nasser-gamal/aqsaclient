/* eslint-disable react/prop-types */

import EditButton from '../../UI/TableButtons/EditButton';
import Table from '../../common/Table/Table';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { NavLink } from 'react-router-dom';
import DeleteButton from '../../UI/TableButtons/DeleteButton';
import showImg from '../../../assets/icons/picture.png'

export default function AppTable({ data, isLoading }) {

  const dispatch = useDispatch();

  const tableHead = [
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "اسم التطبيق",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تحميل مباشر",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "رابط تحميل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "صورة التطبيق",
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



  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  return (
    <Table tableHead={tableHead}>
      <tbody>
        {
          data?.map(app => {
            return <tr key={app.id}>
              <td>
                <DateAndTime createdAt={app.createdAt} />
              </td>
              <td>
                {app.name}
              </td>
              <td>
                {app.isLink ? "لا" : 'نعم'}
              </td>
              <td>
                {app.link || '-'}
              </td>
              <td>
                <NavLink to={`${import.meta.env.VITE_API_BASE_URL}/${app.img}`}>
                  <img style={{ width: '30px', cursor: 'pointer' }} src={showImg} alt={showImg} />
                </NavLink>
              </td>
              <td>
                {app.note || "-"}
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditApp',
                    modalTitle: 'تعديل التطبيق',
                    status: 'تعديل',
                    childrenProps: { app }
                  }}
                />
              </td>
              <td>
                <DeleteButton />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
