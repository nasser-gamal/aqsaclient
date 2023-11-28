import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import DayTable from "./Table/DayTable";
import { notify } from "../../../utils/notify";
import { DateInput } from "../../../utils/formatDate";
import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";
import axios from "axios";
import apiEndpoints from "../../../utils/endPoints";
import { saveAs } from 'file-saver'

import { useGetAllTransactionsQuery, useGetTransactionAggregationsQuery } from '../../../app/features/transaction/transactionApi';

import { TbRefresh } from 'react-icons/tb';
import { Center, Flex, Group, Text } from "@mantine/core";
import ExportButton from "../../UI/ExportButton/ExportButton";

export default function Index() {
  const dispatch = useDispatch()

  // const [form, setForm] = useState({
  //   startDate: DateInput(),
  //   endDate: DateInput(),
  // });

  const [skip, setSkip] = useState(true);


  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    fields: '',
    sort: '',
    keyword: '',
    'date[gte]': DateInput(),
    'date[lte]': DateInput()
  });


  const { data, isLoading, isFetching, refetch } = useGetAllTransactionsQuery(features, { skip });
  const { data: transactionReports, isLoading: reportsLoading, refetch: reportRefecth } = useGetTransactionAggregationsQuery(features, { skip });

  useEffect(() => {
    if (isFetching || isLoading || reportsLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading, reportsLoading]);


  const handleClick = (e) => {
    e.preventDefault()
    setSkip(false)
  }



  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_DAILY_TRANSACTION}?startDate=${form.startDate}&endDate=${form.endDate}`, {
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
      <DaySelect
        features={features}
        setFeatures={setFeatures}
        onClick={handleClick}
        setSkip={setSkip}
      />
      {data && data?.data?.length > 0 &&
        <>
          <Flex justify={'space-between'}>
            <ExportButton/>
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
          <DayTable
            data={data?.data}
            reports={transactionReports?.data}
          />
        </>
      }
      {data?.meta?.pagination?.hasPagination &&
        <Pagination
          features={features}
          setFeatures={setFeatures}
          pagination={data?.meta?.pagination}
        />}
      {data && data?.data?.length < 1 &&
        <Center m={'10 0'}>
          <Text size={'xl'}>
            لا يوجد عمليات
          </Text>
        </Center>
      }
    </>
  )
}
