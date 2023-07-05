/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useFindAllCategoriesQuery } from '../../../app/features/category/categoryApi';
import CustomInput from '../../common/FormFields/input/CustomInput';
import Table from '../../common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function AgentInfoTable() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user);
  console.log(user)

  const tableHead = [
    {
      title: "الاسم",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "البطاقة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الموبايل",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الكود",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "البيان",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "العنوان",
      className: "",
      order: "",
      sort: "",
    },
  ];






  return (
    <div className="user-info">
      <Table tableHead={tableHead}>
        <tbody>
          <tr>
            <td>
              {user.userName}
            </td>
            <td>
              {user.nationalId}
            </td>
            <td>
              {user.phoneNumber}
            </td>
            <td>
              {user.id}
            </td>
            <td>
              عمولة شهر
            </td>
            <td>
              {user.address}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
