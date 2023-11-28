import { useEffect, useState } from 'react';
import { useDispatch, } from 'react-redux';


import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';

import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { useFindAllProvidersQuery } from '../../app/features/provider/providerApi';
import ProviderTable from './Table/ProviderTable';



import CustomPagination from '../UI/Pagination/Pagination';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import ExportButton from '../UI/ExportButton/ExportButton';
import Search from '../UI/Search/Search';
import FilterSelect from '../UI/FilterSelect/FilterSelect';

export default function Index() {
  const dispatch = useDispatch();

  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    fields: '',
    sort: '',
    keyword: '',
    conditions: '',
  })

  const { data, isLoading, isFetching } = useFindAllProvidersQuery({ ...features });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      <>
        <Button
          mb={10}
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditProvider',
              title: 'أضافة  شريحة جديدة',
            })
          }>
          اضافة
        </Button>
        <Flex bg={'#eee'} p={'10px'} mb={'10px'} justify={'space-between'} align={'center'}>
          <Group>
            <FilterSelect features={features} setFeatures={setFeatures} />
          </Group>
          <Search
            options={[
              { label: 'اسم المزود', value: 'name' },
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
        </Flex>
        <ProviderTable
          data={data?.data}
          isLoading={isLoading}
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
    </>
  )
}
