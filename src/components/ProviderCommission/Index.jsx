import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import ProviderCommissionTable from './Table/ProviderCommissionTable';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllProviderCommissionsQuery } from '../../app/features/provider/providerCommissions';


export default function Index() {
  const dispatch = useDispatch();

  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const { data, isLoading, isFetching } = useFindAllProviderCommissionsQuery({ page, limit, order: orderBy, sort });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      <AddButton name={'AddEditProviderCommission'} modalTitle={'اضافة عمولة مزود'} />
      <ProviderCommissionTable data={data?.providerCommissions} />
      {data?.providerCommissions?.pagination.hasPagination && <Pagination pagination={data?.providerCommissions?.pagination} />}
    </>
  )
}
