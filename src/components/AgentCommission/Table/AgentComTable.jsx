/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useFindAllCategoriesQuery } from '../../../app/features/category/categoryApi';
import CustomInput from '../../common/FormFields/input/CustomInput';
import Table from '../../common/Table/Table';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function AgentCommissisonTable() {
  const dispatch = useDispatch()

  const tableHead = [
    {
      title: "الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "القيمة الاجمالية",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الشريحة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "نسبة العمولة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "قيمة العمولة",
      className: "",
      order: "",
      sort: "",
    },
  ];






  return (
    <Table tableHead={tableHead}>
      <tbody>
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
     
        <tr>
          <td className='service'>فودافون كاش</td>
          <td className='amount-total'>
            10000
          </td>
          <td className='segment'>
            الشريحة الاولي
          </td>
          <td className='percentage'>
            1.3
          </td>
          <td className='commission'>
            200
          </td>
        </tr>
        <tr>
          <td>الاجمالي</td>
          <td>
            2000000
          </td>
          <td>

          </td>
          <td>
            الاجمالي
          </td>
          <td>
            120000
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
