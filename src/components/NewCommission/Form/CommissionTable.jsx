/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useFindAllCategoriesQuery } from '../../../app/features/category/categoryApi';
import CustomInput from '../../common/FormFields/input/CustomInput';
import Table from '../../common/Table/Table';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function CommissionTable({ form, setForm, onChange  }) {
  const dispatch = useDispatch()
  const { data, isLoading } = useFindAllCategoriesQuery();

  const tableHead = [
    {
      title: "الخدمة",
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
      title: "عدد العمليات",
      className: "",
      order: "",
      sort: "",
    },
  ];


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);


  useEffect(() => {
    const commissions = [];
    if (data?.categories) {
      data?.categories.map((category) => {
        return commissions.push({ serviceId: category.id, amountTotal: 0, count: 0 })
      })
      setForm({ ...form, commissions })
    }
  }, [data?.categories])

  return (
    <Table tableHead={tableHead} isLoading={isLoading}>
      <tbody>
        {
          data?.categories?.map((category, index) => {
            return <tr key={category.id}>
              <td>
                {category.name}
              </td>
              <td>
                <CustomInput
                  type='text'
                  name='amountTotal'
                  placeholder={'ادخل القيمة'}
                  // value={form?.commissions[index]?.amountTotal}
                  onChange={(e) => onChange(e, index)}
                />
              </td>
              <td>
                <CustomInput
                  type='text'
                  name='count'
                  placeholder={'عدد العمليات'}
                  // value={form?.commissions[index]?.count}
                  onChange={(e) => onChange(e, index)}
                />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
