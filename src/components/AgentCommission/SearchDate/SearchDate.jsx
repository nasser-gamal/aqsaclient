/* eslint-disable react/prop-types */
import YearDate from '../../UI/Commission/SearchDate/Year';
import { Button, Center, Grid,  } from '@mantine/core';
import Month from '../../UI/Commission/SearchDate/Month';

export default function SearchDate({ query, setQuery, setSkip }) {
  const onSubmit = (e) => {
    e.preventDefault()
    setSkip(false);
  }

  return (
    <form onSubmit={onSubmit} style={{
      marginTop: '20px'
    }}>
      <Grid justify='center'>
        <Grid.Col span={{ base: 12, sm: 3}}>
          <YearDate
            form={query}
            setForm={setQuery}
            setSkip={setSkip}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3}}>
          <Month
            form={query}
            setForm={setQuery}
            setSkip={setSkip}
          />
        </Grid.Col>
      </Grid>
      <Center m={'20 0'}>
        <Button
          type='submit'
          disabled={!query.month}
        >
          بحث
        </Button>
      </Center>
    </form>
  )
}
