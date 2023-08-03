import { useEffect } from 'react';
import { useFindAllFeesQuery } from '../../app/features/fees/feesApi';
import AddButton from '../common/Button/AddButton';
import FeesTable from './Table/FeesTable';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllFeesQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditFees'} modalTitle={'اضافة مصاريف أخري'} />
      <FeesTable data={data?.fees} />
      {data?.provider?.pagination.hasPagination && <Pagination pagination={data?.provider?.pagination} />}
    </>
  )
}
