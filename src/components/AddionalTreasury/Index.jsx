import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllAddionalTreasuryQuery } from '../../app/features/addionalTreasury/addionalTreasuryApi';
import AddionalTreasuryTable from './Table/AddionalTreasuryTable';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllAddionalTreasuryQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditAddionalTreasury'} modalTitle={'اضافة أرصدة أخر'} />
      <AddionalTreasuryTable data={data?.addionalTreasury} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
