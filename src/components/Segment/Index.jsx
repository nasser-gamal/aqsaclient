import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';

import { useFindAllSegmentQuery } from '../../app/features/segment/segmentApi';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';

import CustomPagination from '../UI/Pagination/Pagination';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import ExportButton from '../UI/ExportButton/ExportButton';
import Search from '../UI/Search/Search';
import FilterSelect from '../UI/FilterSelect/FilterSelect';

import SegmentTable from './Table/SegmentTable';


export default function Index() {


  const dispatch = useDispatch()

  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    sort: '',
    keyword: '',
  })
  const { data, isLoading, isFetching } = useFindAllSegmentQuery(features);


  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          modals.openContextModal({
            modal: 'AddEditSegment',
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
            { label: 'رقم الفاتورة', value: 'id' },
            // { label: 'اسم الحساب', value: 'bankAccountName' },
            { label: 'الرقم', value: 'number' },
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
      <SegmentTable
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
  )
}
