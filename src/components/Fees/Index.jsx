import { useEffect, useState } from 'react';
import { useGetFeesQuery } from '../../app/features/fees/feesApi';
import FeesTable from './Table/FeesTable';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import ExportButton from '../UI/ExportButton/ExportButton';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import CustomPagination from '../UI/Pagination/Pagination';
import FilterSelect from '../UI/FilterSelect/FilterSelect';
import Search from '../UI/Search/Search';

export default function Index() {
  const dispatch = useDispatch();

  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    fields: '',
    sort: '',
    keyword: '',
  });

  const { data, isLoading } = useGetFeesQuery(features);

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          modals.openContextModal({
            modal: 'AddEditFees',
            title: 'أضافة مصروف جديد  ',
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
            { label: 'رقم الحساب', value: 'accountNumber' },
            { label: 'اسم الحساب', value: 'accountName' },
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
      <FeesTable
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
