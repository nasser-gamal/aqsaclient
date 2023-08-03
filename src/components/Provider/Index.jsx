import { useEffect } from 'react';
import AddButton from '../common/Button/AddButton';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { useFindAllProvidersQuery } from '../../app/features/provider/providerApi';
import ProviderTable from './Table/ProviderTable';
import Pagination from '../UI/Pagination/Pagination';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllProvidersQuery();

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
      <AddButton name={'AddEditProvider'} modalTitle={'اضافة مزود جديد'} />
      <ProviderTable data={data?.provider} />
      {data?.provider?.pagination.hasPagination && <Pagination pagination={data?.provider?.pagination} />}
    </>
  )
}
