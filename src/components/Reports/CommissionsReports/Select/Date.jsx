/* eslint-disable react/prop-types */
import { Button, Center, Grid, TextInput } from '@mantine/core';

export default function DaySelect({ form, setForm, onClick, setSkip }) {

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
    setSkip(true)
  }



  return (
    <form onSubmit={onClick}>
      <Grid justify='center'>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <TextInput m={'10 0'}
            type={'date'}
            label='من'
            name='startDate'
            value={form.startDate}
            onChange={(e) => onChange(e)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <TextInput m={'10 0'}
            type={'date'}
            label='إلي'
            name='endDate'
            value={form.endDate}
            onChange={(e) => onChange(e)}
          />
        </Grid.Col>
      </Grid>
      <Center m={'20 0'}>
        <Button type='submit'  >
          بحث
        </Button>
      </Center>
    </form>
  )
}
