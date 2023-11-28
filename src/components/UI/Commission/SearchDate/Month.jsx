/* eslint-disable react/prop-types */
import { months } from '../../../../utils/months';
import { NativeSelect } from '@mantine/core';

export default function Month({ form, setForm, setSkip }) {

  const handleChange = (e) => {
    setForm({ ...form, month: e.target.value })
    if (setSkip) {
      setSkip(true)
    }
  }

  return (
    <NativeSelect
      data={months}
      onChange={handleChange}
      value={form.month}
      label='الشهر'
    />
  )
}
