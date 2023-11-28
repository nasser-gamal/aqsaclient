/* eslint-disable react/prop-types */
import AgentCommissisonTable from './AgentComTable';
import AgentInfoTable from './AgentInfoTable';

import Spinner from '../../../UI/Loader/Spinner'

import './index.modules.css';
import { Center, Flex, Stack, Text } from '@mantine/core';
import ExportButton from '../../ExportButton/ExportButton';

export default function CommissionTable({ data, isLoading, isFetching }) {

  console.log(data)

  if (isLoading || isFetching) {
    return <Spinner />
  }


  return (
    <>
      {data && data?.length > 0 &&
        <>
          <Flex justify={'end'}>
            <ExportButton />
          </Flex>
          <Stack mt={2} gap={0}>
            <AgentInfoTable data={data[0]} />
            <AgentCommissisonTable data={data[0]} />
          </Stack>
        </>
      }
      {
        data?.length < 1 &&
        <Center m={20}>
          <Text size='xl'>لا يوجد عمولة</Text>
        </Center>
      }
    </>
  )
}
