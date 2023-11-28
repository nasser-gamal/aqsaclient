/* eslint-disable react/prop-types */
import { NativeSelect } from '@mantine/core'

export default function FilterSelect({ features, setFeatures }) {

  const options = [
    {
      label: 'الموجود',
      value: 0
    },
    {
      label: 'المحذوف',
      value: 1
    },
  ]

  return (
    <NativeSelect
      onChange={(e) => setFeatures({ ...features, isDeleted: e.target.value })}
      data={options}
    />
  )
}
