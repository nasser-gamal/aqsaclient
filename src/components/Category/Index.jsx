import { useDispatch, useSelector } from 'react-redux';
import { useFindAllCategoriesQuery } from '../../app/features/category/categoryApi';
import AddButton from '../common/Button/AddButton';
import CategoryTable from './Table/CategoryTable';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';

import EntrySelect from '../UI/LimitSelect/EntrySelect';
import Pagination from '../UI/Pagination/Pagination';

export default function Index() {
  const dispatch = useDispatch();

  const { page, limit, orderBy, sort } = useSelector(state => state.filter);

  const { data, isLoading, isFetching } = useFindAllCategoriesQuery({ page, limit, order: orderBy, sort });

  console.log(data)

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading]);


  console.log(isFetching)
  return (
    <>
      <div className='d-flex flex-between'>
        <AddButton name={'AddEditCategory'} modalTitle={'اضافة خدمة جديدة'} />
        <EntrySelect />
      </div>
      <CategoryTable categories={data?.categories} isLoading={isLoading} />
      {data?.pagination.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
