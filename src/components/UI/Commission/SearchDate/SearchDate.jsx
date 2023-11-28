/* eslint-disable react/prop-types */

import './searchDate.modules.css';

import { Button, Center, Grid } from '@mantine/core';
import Year from './Year';
import Month from './Month';
import Agents from '../../../NewCommission/Form/Agents';

export default function SearchDate({ query, setQuery, setSkip }) {

  const onSubmit = (e) => {
    e.preventDefault()
    setSkip(false);
  }


  return (
    <form onSubmit={onSubmit} className='search-date'>
      <Grid align='center' justify='center'>
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Year
            form={query}
            setForm={setQuery}
            setSkip={setSkip}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Month
            form={query}
            setForm={setQuery}
            setSkip={setSkip}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Agents
            form={query}
            setForm={setQuery}
            setSkip={setSkip}
          />
        </Grid.Col>
      </Grid>
      {/*  <TextInput  m={'10 0'}
          type='text'
          label='بيانات العميل'
          name='search'
          placeholder={'ادخل رقم الموبايل او الرقم القومي'}
          onChange={(e) => {
            setQuery({ ...query, searchValue: e.target.value })
            setSkip(true)
          }}
        /> */}
      <Center m={20}>
        <Button
          type='submit'
          disabled={!query.agentId}
        >
          بحث
        </Button>
      </Center>
    </form>
  )
}
