import { useDispatch, useSelector } from 'react-redux';
import { useFindAllSegmentQuery } from '../../app/features/segment/segmentApi';
import AddButton from '../common/Button/AddButton';
import SegmentTable from './Table/SegmentTable';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { resetFilter } from '../../app/features/filter/filterSlice';
import EntrySelect from '../UI/LimitSelect/EntrySelect';
import Pagination from '../UI/Pagination/Pagination';


export default function Index() {


  const dispatch = useDispatch()
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);

  const { data, isLoading, isFetching } = useFindAllSegmentQuery({ page, limit, order: orderBy, sort });


  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  useEffect(() => {
    dispatch(
      resetFilter()
    );
  }, []);


  return (
    <>
      <div className='d-flex flex-between'>
        <AddButton name={'AddEditSegment'} modalTitle={'اضافة شريحة جديدة'} />
        <EntrySelect />
      </div>
      <SegmentTable segments={data?.segments} isLoading={isLoading} />
      {data?.pagination?.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
