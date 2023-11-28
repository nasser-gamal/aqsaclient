import { useState } from 'react'
import CommissionTable from '../UI/Commission/Table/CommissionTable'
import {  useGetCommissionsQuery } from '../../app/features/commissions/commissionApi';

import SearchDate from '../UI/Commission/SearchDate/SearchDate';
import { months } from '../../utils/months';


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
  const { data, isLoading, isFetching, error} = useGetCommissionsQuery(query, { skip });
console.log(error)

  console.log('data', data)
  return (
    <>
      <SearchDate
        data={data}
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
      />
      <CommissionTable
        data={data?.data}
        // month={query.month}
        // user={data?.userCommission}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  )
}
