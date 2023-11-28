import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import { useGetTransfersQuery } from "../../../app/features/transaction/transferApi";
import { notify } from "../../../utils/notify";
import { getCurrentDateTime, getTomorrowDateTime } from "../../../utils/formatDate";
import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";
import axios from "axios";
import apiEndpoints from "../../../utils/endPoints";
import { saveAs } from 'file-saver'


import TransferTable from "./Table/TansferTable";
import { Button, Center, Flex, Group, Text } from "@mantine/core";
import ExportButton from "../../UI/ExportButton/ExportButton";
import FilterSelect from "../../UI/FilterSelect/FilterSelect";
import Search from "../../UI/Search/Search";

export default function Index() {
  const dispatch = useDispatch()


  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    fields: '',
    sort: '',
    keyword: '',
    'createdAt[gte]': getCurrentDateTime(),
    'createdAt[lte]': getTomorrowDateTime()
  })




  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, error, refetch } = useGetTransfersQuery(features, { skip });


  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading, isFetching]);


  const handleClick = (e) => {
    e.preventDefault()
    setSkip(false)
  }


  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_TRANSFER_TRANSACTION}?startDate=${form.startDate}&endDate=${form.endDate}`, {
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
            <ExportButton />
            <LimitSelect
              features={features}
              setFeatures={setFeatures}
            />
          </Group>
        </Flex>
          <TransferTable
            data={data?.data}
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
