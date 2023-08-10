import { useDispatch } from 'react-redux';
import { useFindAllSegmentQuery } from '../../app/features/segment/segmentApi';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentSegmentsTable from './Table/AgentSegmentTable';


export default function Index() {

  const { data, isLoading } = useFindAllSegmentQuery({ page: "", limit: "", order: 'createdAt', sort: 'ASC' });
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
      <AgentSegmentsTable segments={data?.segments} isLoading={isLoading} />
    </>
  )
}
