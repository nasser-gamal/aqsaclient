import './index.modules.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';


import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

import WithdrawTable from './Table/WithdrawTable'

import CustomPagination from '../../UI/Pagination/Pagination';
import LimitSelect from '../../UI/LimitSelect/LimitSelect';
import ExportButton from '../../UI/ExportButton/ExportButton';
import FilterSelect from '../../UI/FilterSelect/FilterSelect';
import Search from '../../UI/Search/Search';
import { useGetAllTransactionsQuery } from '../../../app/features/transaction/transactionApi';
import { openModal } from '../../../app/features/modal/modalSlice';



export default function Index() {
  const dispatch = useDispatch();

  const [features, setFeatures] = useState({
    page: 1,
    limit: 10,
    sort: '',
    keyword: '',
    type: 'سحب'
  })

  const { data, isLoading, isFetching } = useGetAllTransactionsQuery(features);

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching]);




  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          dispatch(
            openModal({
              name: 'AddEditWithdraw',
              modalTitle: 'اضافة عميلة سحب',
              status: 'حفظ',
              innerProps: { width: '700px' }
            }))}
      >
        اضافة
      </Button >
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
      <WithdrawTable
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
