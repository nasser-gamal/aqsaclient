import { useState, useEffect } from 'react';
import { useDispatch, } from 'react-redux';
import { modals } from '@mantine/modals';
import { Button, Flex, Group } from '@mantine/core';

import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { useFindAllCategoriesQuery } from '../../app/features/category/categoryApi';

import CategoryTable from './Table/CategoryTable';
import ExportButton from '../UI/ExportButton/ExportButton';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import CustomPagination from '../UI/Pagination/Pagination';
import FilterSelect from '../UI/FilterSelect/FilterSelect';
import Search from '../UI/Search/Search';

export default function Index() {
  const [features, setFeatures] = useState({
    page: 1,
    limit: 10,
  });
  const dispatch = useDispatch();

  const { data, isLoading, isFetching } = useFindAllCategoriesQuery(features);

  console.log(data)

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading]);


  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          modals.openContextModal({
            modal: 'AddEditCategory',
            title: 'أضافة خدمة جديدة',
          })
        }>
        اضافة
      </Button>
      <Flex bg={'#eee'} p={'10px'} mb={'5px'} justify={'space-between'} align={'center'}>
        <Group>
          <FilterSelect features={features} setFeatures={setFeatures} />
        </Group>
        <Search
          options={[
            { label: 'اسم الخدمة', value: 'name' },
          ]}
          features={features}
          setFeatures={setFeatures}
        />
        <Group>
          <ExportButton />
          <LimitSelect
            features={features}
            setFeatures={setFeatures}
          />
        </Group>
      </Flex >
      <CategoryTable
        data={data?.data}
      />
      {
        data?.meta?.pagination?.hasPagination &&
        <CustomPagination
          features={features}
          setFeatures={setFeatures}
          pagination={data?.meta?.pagination}
        />
      }

    </>
  )
}
