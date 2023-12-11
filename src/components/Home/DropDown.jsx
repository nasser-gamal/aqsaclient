/* eslint-disable react/prop-types */
import { Select } from '@mantine/core';

export default function DropDown({ form, setForm, setSkip, data, setShowForm, features, setFeatures }) {

  const options = data?.data.map((bankAccount) => ({
    value: `${bankAccount?.id}`,
    label: bankAccount?.accountName,
  })) || [];

  const findBalanceBefore = (selectedValue) => {
    const selectedOption = data?.data.filter((option) => option.id == selectedValue);
    return selectedOption[0];
  };

  const onChange = (value) => {
    const bankAccount = findBalanceBefore(value)
    setForm({ ...form, bankAccount });
    setShowForm(true)
    setFeatures({ ...features, bankAccountId: value });
    setSkip(false)
  };


  return (
    <Select
      w={'100%'}
      m={'10 0'}
      data={options}
      onChange={onChange}
      searchable
      placeholder='الحساب'
      nothingFoundMessage="غير موجود ..."
      allowDeselect={false}

    />
  )
}

