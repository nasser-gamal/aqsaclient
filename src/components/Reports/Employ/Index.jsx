import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { DateInput } from "../../../utils/formatDate";
import Pagination from '../../UI/Pagination/Pagination';
import EmployReportTable from "./Table/EmployReportTable";
import { notify } from "../../../utils/notify";
import DropDown from "./Select/DropDown";
import Date from "../BankAccount/Date";

import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";

import apiEndpoints from "../../../utils/endPoints";
import { saveAs } from 'file-saver'
import { useGetAllTransactionsQuery, useGetTransactionAggregationsQuery } from '../../../app/features/transaction/transactionApi';

import { TbRefresh } from 'react-icons/tb';
import { Button, Center, Flex, Grid, Group, Text } from "@mantine/core";
import ExportButton from "../../UI/ExportButton/ExportButton";

import './employ.modules.css';

export default function Index() {
  const dispatch = useDispatch()

  // const [form, setForm] = useState({
  //   userId: "",
  //   startDate: DateInput(),
  //   endDate: DateInput()
  // });

  const [features, setFeatures] = useState({
    // page: '',
    // limit: '',
    // fields: '',
    // sort: '',
    // keyword: '',
    'date[gte]': DateInput(),
    'date[lte]': DateInput()
  })


  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useGetAllTransactionsQuery(features, { skip });
  const { data: transactionReports, isLoading: reportsLoading, refetch: reportRefecth } = useGetTransactionAggregationsQuery(features, { skip });


  const handleClick = () => {
    if (!features.createdBy) {
      notify('error', 'اختر المستخدم')
    } else {
      setSkip(false)
    }
  }
  useEffect(() => {
    if (isFetching || isLoading || reportsLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading, reportsLoading]);





  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_EMPLOY_TRANSACTION}?userId=${form.userId}&startDate=${form.startDate}&endDate=${form.endDate}`, {
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
          <Date
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
          disabled={!features.createdBy}
        >بحث
        </Button>
      </Center>
      {data && data?.data?.length > 0 &&
        <>
          <Flex justify={'space-between'}>
            <ExportButton />
            <Group>
              <TbRefresh style={{
                fontSize: '26px',
                color: 'black',
                cursor: 'pointer'
              }}
                onClick={() => {
                  refetch()
                  reportRefecth()
                }}
              />
              <LimitSelect
                features={features}
                setFeatures={setFeatures}
              />
            </Group>
          </Flex>
          <EmployReportTable
            data={data?.data}
            reports={transactionReports?.data}
          />
        </>
      }
      {data && data?.data?.length < 1 &&
        <Center m={'10 0'}>
          <Text size={'xl'}>
            لا يوجد عمليات
          </Text>
        </Center>
      }
      {data?.meta?.pagination?.hasPagination &&
        <Pagination
          features={features}
          setFeatures={setFeatures}
          pagination={data?.meta?.pagination}
        />}
    </>
  )
}
