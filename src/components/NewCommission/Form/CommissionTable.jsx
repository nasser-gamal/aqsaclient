/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import Table from '../../common/Table/Table';
import Spinner from '../../UI/Loader/Spinner';
import axios from 'axios'
import { useState } from 'react';

export default function CommissionTable({ data, isLoading, form, setForm, onChange }) {

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

  const [datas, setData] = useState()

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/category/getAll`, {
        withCredentials: true,
      });
      console.log(response)
      setData(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const commissions = [];
    if (data?.categories) {
      data?.categories.map((category) => {
        return commissions.push({ serviceId: category.id, amountTotal: 0, count: 0 })
      })
      setForm({ ...form, commissions })
    }
  }, [data?.categories])


  if (isLoading) {
    return <Spinner />
  }

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
                  value={form?.commissions[index]?.amountTotal || 0}
                  onChange={(e) => onChange(e, index)}
                />
              </td>
              <td>
                <CustomInput
                  type='text'
                  name='count'
                  placeholder={'عدد العمليات'}
                  value={form?.commissions[index]?.count || 0}
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
