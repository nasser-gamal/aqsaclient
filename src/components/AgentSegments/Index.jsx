import { useDispatch } from 'react-redux';
import { useFindAllSegmentQuery } from '../../app/features/segment/segmentApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentSegmentsTable from './Table/AgentSegmentTable';
import './segment.modules.css';

export default function Index() {

  const { data, isLoading } = useFindAllSegmentQuery(
    {
      limit: 10000,
    }
  );
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
      <AgentSegmentsTable data={data?.data} isLoading={isLoading} />
    </>
  )
}
