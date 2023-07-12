/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import Table from '../../common/Table/Table';
import Spinner from '../../UI/Loader/Spinner';

export default function CommissionTable({data, isLoading, form, setForm, onChange }) {

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
  console.log(data)

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
