import { useDispatch } from 'react-redux';
import { useFindAllUsersQuery } from '../../app/features/user/userApi';
import { useEffect, useState } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { Button, Flex, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import UserTable from './Table/UserTable';
import CustomPagination from '../UI/Pagination/Pagination';
import ExportButton from '../UI/ExportButton/ExportButton';
import Search from '../UI/Search/Search';
import FilterSelect from '../UI/FilterSelect/FilterSelect';


export default function Agents() {
  const [features, setFeatures] = useState({
    page: 1,
    limit: 10,
    sort: '',
    keyword: '',
    roleId: 3
  });

  const { data, isLoading, error } = useFindAllUsersQuery(features);
  const dispatch = useDispatch()

  console.log(error)
  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);



  return (
    <>
      <Button
        mb={10}
        onClick={() =>
          modals.openContextModal({
            modal: 'AddEditUser',
            title: 'أضافة وكيل جديد',
            innerProps: { roleId: 3 }
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
            { label: 'اسم الحساب', value: 'accountName' },
            { label: 'صاحب الحساب', value: 'userName' },
            { label: 'رقم الموبايل', value: 'phoneNumber' },
            { label: 'الرقم القومي', value: 'nationalId' },
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
      <UserTable
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
