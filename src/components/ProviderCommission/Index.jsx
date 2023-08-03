import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import ProviderCommissionTable from './Table/ProviderCommissionTable';
import Pagination from '../UI/Pagination/Pagination';
import { useFindAllProviderCommissionsQuery } from '../../app/features/provider/providerCommissions';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllProviderCommissionsQuery();

  console.log(data)

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditProviderCommission'} modalTitle={'اضافة عمولة مزود'} />
      <ProviderCommissionTable data={data?.providerCommissions} />
      {data?.providerCommissions?.pagination.hasPagination && <Pagination pagination={data?.providerCommissions?.pagination} />}
    </>
  )
}
