/* eslint-disable react/prop-types */
import { useFindAllProvidersQuery } from '../../../app/features/provider/providerApi';
import { Select } from '@mantine/core';

export default function ProviderSelect({ form, setForm, disabled }) {


  const { data } = useFindAllProvidersQuery({ limit: 100000 });


  const options = data?.data.map((element) => ({
    value: `${element?.id}`,
    label: element?.name,
  })) || [];


  const onChange = (value) => {
    setForm({ ...form, providerId: value });
  }

  // console.log(value)

  return (
    <Select
      w={'100%'}
      m={'10 0'}

      label="اختر الخدمة"
      data={options}
      onChange={onChange}
      // defaultValue={value}
      disabled={disabled}
      searchable
      nothingFoundMessage="الخدمة غير موجودة..."
      allowDeselect={false}

    />
  )
}
