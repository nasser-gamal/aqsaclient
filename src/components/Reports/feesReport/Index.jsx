import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import { useGetFeesQuery } from "../../../app/features/fees/feesApi";
import { getCurrentDateTime, getTomorrowDateTime } from "../../../utils/formatDate";
import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";

import { Button, Center, Flex, Group, Text } from "@mantine/core";
import ExportButton from "../../UI/ExportButton/ExportButton";

import FeesReportTable from "./Table/FeesReportTable";
import FilterSelect from '../../UI/FilterSelect/FilterSelect';
import Search from '../../UI/Search/Search';

export default function Index() {
  const dispatch = useDispatch()


  const [features, setFeatures] = useState({
    page: '',
    limit: '',
    'date[gte]': getCurrentDateTime(),
    'date[lte]': getTomorrowDateTime()
  })


  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useGetFeesQuery(features, { skip });


  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching, isLoading]);


  const handleClick = (e) => {
    e.preventDefault()
    setSkip(false)
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
          <FeesReportTable
            data={data}
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
            لا يوجد مصاريف لهذه الفترة
          </Text>
        </Center>
      }
    </>
  )
}
