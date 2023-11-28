/* eslint-disable react/prop-types */
import { NativeSelect } from '@mantine/core';

export default function Year({ form, setForm }) {

  const yearOptions = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let i = 0; i < 11; i++) {
    const year = currentYear - i;
    if (i === 10 && currentMonth < 10) {
      continue;
    }
    yearOptions.push(year);
  }


  const handleChange = (e) => {
    setForm({ ...form, year: e.target.value })
  }

  return (
    <NativeSelect
      data={yearOptions}
      onChange={handleChange}
      label='السنة'
    />
  )
}
