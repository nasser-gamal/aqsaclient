/* eslint-disable react/prop-types */
import { months } from '../../../utils/months';
import { NativeSelect } from '@mantine/core';

export default function Month({ form, setForm }) {

  const handleChange = (e) => {
    setForm({ ...form, month: e.target.value })
  }

  return (
    <NativeSelect
      data={months}
      onChange={handleChange}
      label='الشهر'
      value={form.month}
    />
  )
}
