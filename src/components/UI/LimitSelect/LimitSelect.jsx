/* eslint-disable react/prop-types */
import { NativeSelect } from "@mantine/core";

export default function LimitSelect({ features, setFeatures }) {
  return (
    <NativeSelect
      data={[10, 30, 50, 70, 100]}
      onChange={(e) => setFeatures({ ...features, page: 1, limit: e.target.value })}
    />
  )
}
