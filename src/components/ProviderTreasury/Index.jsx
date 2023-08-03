import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllProviderTreasuryQuery } from '../../app/features/providerTreasury/providerTreasuryApi';
import ProviderTreasuryTable from './Table/ProviderTreasuryTable';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllProviderTreasuryQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditProviderTreasury'} modalTitle={'اضافة رصيد مزود'} />
      <ProviderTreasuryTable data={data?.providerTreasury} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
