import { useDispatch } from 'react-redux';
import { useFindAllSegmentQuery } from '../../app/features/segment/segmentApi';
import AddButton from '../common/Button/AddButton';
import SegmentTable from './Table/SegmentTable';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';


export default function Index() {

  const { data, isLoading } = useFindAllSegmentQuery();
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
      <AddButton name={'AddEditSegment'} modalTitle={'اضافة شريحة جديدة'} />
      <SegmentTable segments={data?.segments} isLoading={isLoading} />
    </>
  )
}
