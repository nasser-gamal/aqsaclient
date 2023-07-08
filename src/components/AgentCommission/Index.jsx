import { useState } from 'react';

import CommissionTable from '../UI/Commission/Table/CommissionTable';
import SearchDate from './SearchDate/SearchDate';


import { useFindAllCommissionsQuery } from '../../app/features/commissions/commissionApi';

import './agent.modules.css';
import { useSelector } from 'react-redux';

export default function Index() {

  const { user } = useSelector(state => state.user)

  const [query, setQuery] = useState({
    agentId: 4,
    year: 2023,
    month: '',
    searchValue: ''
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
