import Pagination from '../../UI/Pagination/Pagination';
import DropDown from "./DropDown";
import BankReportTable from "./Table/BankReportTable";
import { useEffect, useState } from "react";
import DaySelect from "./Date";
import { notify } from '../../../utils/notify';

import './index.modules.css';
import { getCurrentDateTime, getTomorrowDateTime } from "../../../utils/formatDate";
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import LimitSelect from '../../UI/LimitSelect/LimitSelect';

import { useGetAllTransactionsQuery } from '../../../app/features/transaction/transactionApi';

import { saveAs } from 'file-saver'
import axios from 'axios';
import apiEndpoints from '../../../utils/endPoints';

import { Button, Center, Flex, Grid, Group, Text } from '@mantine/core';
import ExportButton from '../../UI/ExportButton/ExportButton';
import FilterSelect from '../../UI/FilterSelect/FilterSelect';
import Search from '../../UI/Search/Search';


export default function Index() {
  const dispatch = useDispatch()

  // const [form, setForm] = useState({
  //   bankAccountId: "",
  //   startDate: getCurrentDateTime(),
  //   endDate: getCurrentDateTime()
  // });


  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    sort: '',
    'date[gte]': getCurrentDateTime(),
    'date[lte]': getTomorrowDateTime()
  })

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useGetAllTransactionsQuery(features, { skip });



  const handleClick = () => {
    if (!features.bankAccountId) {
      notify('error', 'اختر الحساب')
    } else {
      setSkip(false)
    }
  }



  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading]);



  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_BANK_TRANSACTION}?bankAccountId=${form.bankAccountId}&startDate=${form.startDate}&endDate=${form.endDate}`, {
        headers: { 'Content-Type': 'blob' },
        responseType: 'arraybuffer',
        withCredentials: true,
      });
      const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(file, 'data.xlsx');
      dispatch(hideLoader())
    } catch (err) {
      dispatch(hideLoader())
      notify('error', err.data.message)
    }
  }


  return (
    <>
      <Grid justify='center'>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <DropDown
            features={features}
            setFeatures={setFeatures}
            setSkip={setSkip}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <DaySelect
            features={features}
            setFeatures={setFeatures}
            onClick={handleClick}
            setSkip={setSkip}
          />
        </Grid.Col>
      </Grid>
      <Center m={'20 0'}>
        <Button
          type='button'
          onClick={handleClick}
          disabled={!features.bankAccountId}
        >بحث
        </Button>
      </Center>
      {data && data?.data?.length > 0 &&
        <>
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
            <Button
              onClick={() => {
                refetch()
              }}>
              تحديث
            </Button>

            {/* <TbRefresh style={{
              fontSize: '26px',
              color: 'black',
              cursor: 'pointer'
            }}
        
            /> */}
            <ExportButton />
            <LimitSelect
              features={features}
              setFeatures={setFeatures}
            />
          </Group>
        </Flex>
          <BankReportTable
            data={data?.data}
            reports={data?.meta}
          />
        </>
      }
      {
        data && data?.data?.length < 1 &&
        <Center m={'10 0'}>
          <Text size={'xl'}>
            لا يوجد عمليات
          </Text>
        </Center>
      }
      {
        data?.meta?.pagination?.hasPagination &&
        <Pagination
          features={features}
          setFeatures={setFeatures}
          pagination={data?.meta?.pagination}
        />
      }
    </>
  )
}
