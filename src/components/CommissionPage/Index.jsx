import { useState } from 'react'
import CommissionTable from '../UI/Commission/Table/CommissionTable'
import { useFindAllCommissionsQuery } from '../../app/features/commissions/commissionApi';

import SearchDate from '../UI/Commission/SearchDate/SearchDate';


export default function Index() {


  const [query, setQuery] = useState({
    month: "",
    year: 2023,
    agentId: '',
    searchValue: '',
  });

  const [skip, setSkip] = useState(true);
  const { data, isLoading, isFetching } = useFindAllCommissionsQuery({ ...query }, { skip });

  return (
    <>
      <SearchDate
        data={data}
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
      />
      <CommissionTable
        data={data}
        month={query.month}
        user={data && data?.commissions[0]?.agent}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  )
}
