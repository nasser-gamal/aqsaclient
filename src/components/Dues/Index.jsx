import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllDuesQuery } from '../../app/features/dues/duesApi';
import DuesTable from './Table/DuesTable';


export default function Index() {
  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const { data, isLoading, isFetching } = useFindAllDuesQuery({ page, limit, order: orderBy, sort });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      <AddButton name={'AddEditDues'} modalTitle={'اضافة مستحقات'} />
      <DuesTable data={data?.dues} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
