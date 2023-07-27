import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import { useFindDailyFeesQuery } from "../../../app/features/reports/reportsApi";
import { notify } from "../../../utils/notify";
import { DateInput } from "../../../utils/formatDate";
import EntrySelect from "../../UI/LimitSelect/EntrySelect";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";



import { TbRefresh } from 'react-icons/tb';
import FeesReportTable from "./Table/FeesReportTable";

export default function Index() {
  const { page, limit, orderBy } = useSelector(state => state.filter);
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useFindDailyFeesQuery({
    startDate: form.startDate,
    endDate: form.endDate,
    page,
    limit,
    order: orderBy,
    sort: "ASC"
  }, { skip });


  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  const handleClick = () => {
    if (!form.startDate || !form.endDate) {
      notify('error', 'اختر التاريخ')
    } else {
      setSkip(false)
    }
  }


  return (
    <>
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {data && data?.fees?.fees.length > 0 &&
        <>
          <div className='d-flex flex-between' style={{ paddingBottom: '3px' }}>
            <div></div>
            <div className="d-flex flex-center" style={{ gap: '10px' }}>
              <span className="d-flex">
                <TbRefresh style={{
                  fontSize: '26px',
                  color: 'black',
                  cursor: 'pointer'
                }}
                  onClick={() => refetch()}
                />
              </span>
              <EntrySelect />
            </div>
          </div>
          <FeesReportTable form={form} data={data} isLoading={isLoading} />
        </>
      }
      {data && data?.fees?.fees.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>}
      {data?.fees?.pagination?.hasPagination && <Pagination pagination={data?.fees?.pagination} />}
    </>
  )
}
