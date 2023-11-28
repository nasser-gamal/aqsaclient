/* eslint-disable react/prop-types */
import { Grid, TextInput } from '@mantine/core'

export default function DateRangeInput({ options }) {

  const onChange = (e) => {
    const { name, value } = e.target;

  }

  return (
    <Grid justify='center'>
      {
        options.map((option, index) => {
          return <Grid.Col key={index} span={{ base: 12, sm: 3 }}>
            <TextInput m={'10 0'}
              type={'date'}
              label={option.label}
              name={option.name}
              value={option.value}
              onChange={(e) => {
                options.setValues({ ...options.values, [name]: e.target })
                options.setSkip(true)
              }}
            />
          </Grid.Col>
        })
      }
    </Grid>
  )
}
