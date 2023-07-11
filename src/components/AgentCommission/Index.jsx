import { useState } from 'react';

import CommissionTable from '../UI/Commission/Table/CommissionTable';
import SearchDate from './SearchDate/SearchDate';


import { useFindAllCommissionsQuery } from '../../app/features/commissions/commissionApi';

import './agent.modules.css';

export default function Index() {


  const [query, setQuery] = useState({
    agentId: 4,
    year: 2023,
    month: '',
    searchValue: ''
  });

  const [skip, setSkip] = useState(true);
  const { data, isLoading, isFetching, isError } = useFindAllCommissionsQuery({ ...query }, { skip});





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
        user={data && data?.userCommission}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
      />
    </>
  )
}
