import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentBox from './agentBox/AgentBox';
import { useFindAllAgentsQuery } from '../../app/features/user/agentApi';

import './index.modules.css';

export default function Index() {

  const { data, isLoading } = useFindAllAgentsQuery({ page: "", limit: "", order: 'createdAt', sort: 'ASC' });
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
      <div className='text-center' style={{
        marginTop: '20px'
      }}>
        <h1>وكلاء الاقصي</h1>
      </div>
      <AgentBox agents={data?.users} />
    </>
  )
}
