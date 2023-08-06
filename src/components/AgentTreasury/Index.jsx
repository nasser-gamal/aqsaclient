import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentTreasuryTable from './Table/AgentTreasuryTable';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllAgentTreasuryQuery } from '../../app/features/agentTreasury/agentTreasuryApi';


export default function Index() {
  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const { data, isLoading, isFetching } = useFindAllAgentTreasuryQuery({ page, limit, order: orderBy, sort });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])


  return (
    <>
      <AddButton name={'AddEditAgentTreasury'} modalTitle={'اضافة جديد'} />
      <AgentTreasuryTable data={data?.agentTreasury} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
