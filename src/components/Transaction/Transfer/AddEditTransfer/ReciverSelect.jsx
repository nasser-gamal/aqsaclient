/* eslint-disable react/prop-types */
import { Select } from '@mantine/core';

export default function ReciverSelect({ data, form, setForm, disabled, defaultValue }) {


  const options = data?.map((bankAccount) => ({
    value: `${bankAccount?.id}`,
    label: bankAccount?.accountName,
  })) || [];


  const onChange = (value) => {
    setForm({ ...form, recipientId: value });
  }



  return (
    <Select
      m={'10 0'}
      w={'100%'}
      label="اختر البنك"
      data={options}
      onChange={onChange}
      disabled={disabled}
      defaultSearchValue={defaultValue}
      searchable
      nothingFoundMessage="غير موجود ..."
      allowDeselect={false}

    />
  )
}
