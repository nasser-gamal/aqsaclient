import { useEffect, useState } from "react";
import DaySelect from "./Select/Date";
import { useFindDailyCommissionsQuery } from "../../../app/features/reports/reportsApi";
import { notify } from "../../../utils/notify";
import { DateInput } from "../../../utils/formatDate";
import LimitSelect from "../../UI/LimitSelect/LimitSelect";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";



import { TbRefresh } from 'react-icons/tb';
import CommissionsReportTable from "./Table/CommissionsReportTable";

export default function Index() {
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isFetching, refetch, error } = useFindDailyCommissionsQuery({
    startDate: form.startDate,
    endDate: form.endDate,
    limit: 10000,
  }, { skip });

  console.log(data)
  console.log(error)


  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  const handleClick = (e) => {
    e.preventDefault()
    if (!form.startDate || !form.endDate) {
      notify('error', 'اختر التاريخ')
    } else {
      setSkip(false)
    }
  }


  return (
    <>
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {data && data?.agentCommissions.length > 0 &&
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
              <LimitSelect
              // features={features}
              // setFeatures={setFeatures}
              />
            </div>
          </div>
          <CommissionsReportTable data={data} />
        </>
      }
      {data && data?.agentCommissions.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمولة</span></div>}
    </>
  )
}
