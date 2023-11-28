import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import { useGetFeesQuery } from "../../../app/features/fees/feesApi";
import { getCurrentDateTime, getTomorrowDateTime } from "../../../utils/formatDate";
import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";

import { TbRefresh } from 'react-icons/tb';
import { Center, Flex, Group, Text } from "@mantine/core";
import ExportButton from "../../UI/ExportButton/ExportButton";

import FeesReportTable from "./Table/FeesReportTable";

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
                }}
              />
              <LimitSelect
                features={features}
                setFeatures={setFeatures}
              />
            </Group>
          </Flex>
          <FeesReportTable
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
            لا يوجد مصاريف لهذه الفترة
          </Text>
        </Center>
      }
    </>
  )
}
