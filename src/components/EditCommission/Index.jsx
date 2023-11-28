import { useState } from 'react'
import SearchDate from '../UI/Commission/SearchDate/SearchDate'
import { useGetCommissionsQuery } from '../../app/features/commissions/commissionApi';
import EditCommissionTable from './Table/EditCommissionTable';
import { months } from '../../utils/months';
import { Center, Text } from '@mantine/core';

export default function Index() {


  var currentDate = new Date();
  var currentMonthIndex = currentDate.getMonth();

  const [query, setQuery] = useState({
    month: months[currentMonthIndex],
    year: new Date().getFullYear(),
    agentId: '',
    limit: 10000
  });


  const [skip, setSkip] = useState(true);
  const { data, isLoading, isFetching } = useGetCommissionsQuery(query, { skip });

  return (
    <>
      <SearchDate
        data={data}
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
      />
      {
        data && data?.data.length > 0 && <EditCommissionTable
          data={data?.data[0]}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      }
      {
        data && data?.data.length < 1 && <Center>
          <Text span size={'xl'}>
            لا يوجد عمولة
          </Text>
        </Center>
      }
    </>
  )
}
