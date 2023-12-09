/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Table, TextInput, Title } from '@mantine/core';
import CustomTable from '../../common/CustomTable/CustomTable';
import Spinner from '../../UI/Loader/Spinner';

export default function CommissionTable({ data, isLoading, form, setForm, onChange }) {

  const theads = [
    {
      title: "الفئة",
      className: "",
      order: "",
      sort: "",
    },
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
    if (data) {
      data.forEach((category) => {
        // Assuming subcategories are available within the category object
        const subCategories = category?.subCategories.map((subCategory) => ({
          id: subCategory.id,
          amount: 0,
          count: 0,
        }));
        commissions.push({
          categoryId: category.id,
          subCategories: subCategories,
        });
      });
      setForm({ ...form, commissions })
    }
  }, [data])


  if (isLoading) {
    return <Spinner />
  }


  const rows = data?.map((element, index) => (
    <React.Fragment key={element.id}>
      <Table.Tr>
        <Table.Td style={{ textAlign: 'center' }} rowSpan={element?.subCategories?.length + 1}  p={'10 30'}>
          <Title order={3} fw={'normal'}>{element?.name}</Title>
        </Table.Td>
      </Table.Tr>

      {element?.subCategories.map((ele, indx) => (
        <React.Fragment key={ele.id}>
          <Table.Tr color='red'>
            <Table.Td>{ele.name}</Table.Td>
            <Table.Td>
              <TextInput
                m={'10 0'}
                type='number'
                name='amount'
                placeholder={'ادخل القيمة'}
                value={form?.commissions[index]?.subCategories[indx]?.amount || 0}
                onChange={(e) => onChange(e, index, indx)}
                fw={'bold'}
              />
            </Table.Td>
            <Table.Td>
              <TextInput
                m={'10 0'}
                type='number'
                name='count'
                placeholder={'عدد العمليات'}
                value={form?.commissions[index]?.subCategories[indx]?.count || 0}
                onChange={(e) => onChange(e, index, indx)}
                fw={'bold'}
              />
            </Table.Td>
          </Table.Tr>

          {/* Add an empty row or a separator row between sub-categories */}
          {indx === element?.subCategories.length - 1 && (
            <Table.Tr key={`${element.id}-separator`}>
              <Table.Td colSpan={3}></Table.Td>
            </Table.Tr>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  ));

  // Use the tableRows in your Table component



  return (
    <CustomTable theads={theads} rows={rows} />
  )
}
