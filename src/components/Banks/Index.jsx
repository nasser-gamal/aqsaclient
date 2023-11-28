import { useFindAllBanksQuery } from '../../app/features/bank/bankApi';
import BankTable from './Table/BankTable';
import { useEffect, useState } from 'react';
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
    sort: '',
    keyword: '',
  });


  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useFindAllBanksQuery(features);


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
          modals.openContextModal({
            modal: 'AddEditBank',
            title: 'أضافة بنك جديد',
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
            { label: 'اسم البنك', value: 'bankName' },
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
      <BankTable
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
