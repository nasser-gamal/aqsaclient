import { useState, useEffect } from 'react';
import { useFindAllBankAccountsQuery } from '../../app/features/bankAccount/bankAccountApi';
import BankAccountTable from './Table/BankAccountTable';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { modals } from '@mantine/modals';
import { Button, Flex, Group } from '@mantine/core';
import ExportButton from '../UI/ExportButton/ExportButton';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import CustomPagination from '../UI/Pagination/Pagination';
import FilterSelect from '../UI/FilterSelect/FilterSelect';
import Search from '../UI/Search/Search';


export default function Index() {
  const [features, setFeatures] = useState({
    page: 1,
    limit: 10,
    sort: '-createdAt',
  });

  const dispatch = useDispatch();

  const { data, isLoading, isFetching } = useFindAllBankAccountsQuery(features);

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
            modal: 'AddEditBankAccount',
            title: 'أضافة حساب بنكى جديد',
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
      <BankAccountTable
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
