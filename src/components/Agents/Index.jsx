import { useDispatch } from 'react-redux';
import { useFindAllUsersQuery } from '../../app/features/user/userApi';
import { useEffect, useState } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { Button, Flex, Group, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import UserTable from './Table/UserTable';
import CustomPagination from '../UI/Pagination/Pagination';
import ExportButton from '../UI/ExportButton/ExportButton';


export default function Users() {
  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    fields: '',
    sort: '',
    keyword: '',
    roleId: 2
  });

  const { data, isLoading } = useFindAllUsersQuery(features);
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);



  return (
    <>
      <Flex bg={'#eee'} p={'10px'} mb={'10px'} justify={'space-between'} align={'center'}>
        <Button
          onClick={() =>
            modals.openContextModal({
              modal: 'AddEditUser',
              title: 'أضافة ايداع جديد',
            })
          }>
          اضافة
        </Button>
        <Group gap={6}>
          <Text>
            اجمالي  الحسابات
          </Text>
          <Title order={3} c={'red'}>
            {data?.meta?.pagination?.totalItems}
          </Title>
        </Group>
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
