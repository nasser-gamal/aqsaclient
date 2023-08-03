import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentTreasuryTable from './Table/AgentTreasuryTable';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllAgentTreasuryQuery } from '../../app/features/agentTreasury/agentTreasuryApi';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllAgentTreasuryQuery();
  console.log(data)

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditAgentTreasury'} modalTitle={'اضافة جديد'} />
      <AgentTreasuryTable data={data?.agentTreasury} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
