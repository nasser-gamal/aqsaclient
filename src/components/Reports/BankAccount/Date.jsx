/* eslint-disable react/prop-types */
import { Grid, TextInput } from '@mantine/core';

export default function DaySelect({ setSkip, features, setFeatures }) {

  const onChange = (e) => {
    const { name, value } = e.target;
    setFeatures({ ...features, [name]: value })
    setSkip(true)
  }

  return (
    <Grid justify='center'>
      <Grid.Col span={{ base: 6 }}>
        <TextInput m={'10 0'}
          type={'date'}
          label='من'
          name='date[gte]'
          value={features["date[gte]"]}
          onChange={(e) => onChange(e)}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 6 }}>
        <TextInput m={'10 0'}
          type={'date'}
          label='إلي'
          name='date[lte]'
          value={features["date[lte]"]}
          onChange={(e) => onChange(e)}
        />
      </Grid.Col>
    </Grid>
  )
}
