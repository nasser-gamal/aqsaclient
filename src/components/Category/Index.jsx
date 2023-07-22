import { useDispatch } from 'react-redux';
import { useFindAllCategoriesQuery } from '../../app/features/category/categoryApi';
import AddButton from '../common/Button/AddButton';
import CategoryTable from './Table/CategoryTable';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';

import Pagination from '../Pagination/Pagination'

export default function Index() {
  const dispatch = useDispatch();

  const { data, isLoading } = useFindAllCategoriesQuery({ page: 1, limit: 1000, order: 'createdAt', sort: 'ASC' });

  console.log(data)

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <AddButton name={'AddEditCategory'} modalTitle={'اضافة خدمة جديدة'} />
      <CategoryTable categories={data?.categories} isLoading={isLoading} />
      {/* <Pagination  pagination={data?.pagination}/> */}
    </>
  )
}
