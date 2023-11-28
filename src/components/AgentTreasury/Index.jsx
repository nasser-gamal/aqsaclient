import { useEffect, useState } from 'react';

import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useDispatch,  } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentTreasuryTable from './Table/AgentTreasuryTable';
import { useFindAllAgentTreasuryQuery } from '../../app/features/agentTreasury/agentTreasuryApi';

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

  const { data, isLoading, isFetching } = useFindAllAgentTreasuryQuery({ ...features });

  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching])


  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          modals.openContextModal({
            modal: 'AddEditAgentTreasury',
            title: 'أضافة  رصيد تجار',
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
            { label: 'القيمة', value: 'amount' },
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
      <AgentTreasuryTable
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
