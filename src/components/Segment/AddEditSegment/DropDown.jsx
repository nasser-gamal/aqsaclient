/* eslint-disable react/prop-types */
import { Select } from '@mantine/core';
import { useFindAllCategoriesQuery } from '../../../app/features/category/categoryApi';

export default function DropDown({ form, setForm, disabled , value }) {

  const { data } = useFindAllCategoriesQuery({ limit: 10000 });

  const options = data?.data.map((element) => ({
    value: `${element?.id}`,
    label: element?.name,
  })) || [];


  const onChange = (value) => {
    setForm({ ...form, serviceId: value });
  }


  return (
    <Select
      w={'100%'}
      m={'10 0'}
      label="اختر الخدمة"
      data={options}
      onChange={onChange}
      disabled={disabled}
      placeholder={value.label}
      searchable
      nothingFoundMessage="الخدمة غير موجودة..."
      allowDeselect={false}

    />
  )
}
