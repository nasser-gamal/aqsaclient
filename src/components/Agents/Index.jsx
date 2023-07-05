import { useEffect } from 'react';
import { useFindAllAgentsQuery } from '../../app/features/user/agentApi';
import AddButton from '../common/Button/AddButton';
import AgentTable from './Table/AgentTable';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';


export default function Users() {
  const { data, isLoading } = useFindAllAgentsQuery();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <AddButton name={'AddEditAgent'} modalTitle={'إضافة وكيل'} />
      <AgentTable users={data?.users} isLoading={isLoading} />
    </>
  )
}
