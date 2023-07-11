import  { useState } from 'react'
import SearchDate from '../UI/Commission/SearchDate/SearchDate'
import { useFindAllCommissionsQuery } from '../../app/features/commissions/commissionApi';
import EditCommissionTable from './Table/EditCommissionTable';

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
      <EditCommissionTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  )
}
