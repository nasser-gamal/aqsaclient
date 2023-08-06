import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllAddionalTreasuryQuery } from '../../app/features/addionalTreasury/addionalTreasuryApi';
import AddionalTreasuryTable from './Table/AddionalTreasuryTable';


export default function Index() {
  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const { data, isLoading, isFetching } = useFindAllAddionalTreasuryQuery({ page, limit, order: orderBy, sort });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      <AddButton name={'AddEditAddionalTreasury'} modalTitle={'اضافة أرصدة أخر'} />
      <AddionalTreasuryTable data={data?.addionalTreasury} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
