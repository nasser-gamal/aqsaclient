import { useState } from 'react';
import { useSelector } from 'react-redux';

import CommissionTable from '../UI/Commission/Table/CommissionTable';
import SearchDate from './SearchDate/SearchDate';

import { useGetLoggedUserCommissionsQuery } from '../../app/features/commissions/commissionApi';

import './agent.modules.css';
import { months } from '../../utils/months';


export default function Index() {
  var currentDate = new Date();
  var currentMonthIndex = currentDate.getMonth();
  const [query, setQuery] = useState({
    year: new Date().getFullYear(),
    month: months[currentMonthIndex],
    limit: 10000
  });

  const [skip, setSkip] = useState(true);
  const { data, isLoading, isFetching, isError } = useGetLoggedUserCommissionsQuery(query, { skip });

  return (
    <>
      <SearchDate
        query={query}
        setQuery={setQuery}
        setSkip={setSkip}
      />

      <CommissionTable
        data={data?.data}
        user={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
      />
    </>
  )
}
