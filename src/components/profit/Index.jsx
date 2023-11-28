import { useEffect, useState } from "react";
import DaySelect from "./Date/Date";
import { useFindAllProfitsQuery } from "../../app/features/treasury/profitsApi";
import { notify } from "../../utils/notify";
import { DateInput } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
// import axios from "axios";
// import apiEndpoints from "../../utils/endpoints";
// import { saveAs } from 'file-saver'


import { TbRefresh } from 'react-icons/tb';
import ProfitTable from "./Table/ProfitTable";
// import { useGetTransactionAggregationsQuery } from "../../app/features/transaction/transactionApi";

export default function Index() {
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch, error } = useFindAllProfitsQuery({
    startDate: form.startDate,
    endDate: form.endDate,
  }, { skip });
  // const { data: transactionReports, isLoading: reportsLoading, error } = useGetTransactionAggregationsQuery({ 'date[gte]': form.startDate, 'date[lte]': form.endDate }, { skip });



  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading,  isFetching]);


  const handleClick = (e) => {
    e.preventDefault()
    if (!form.startDate || !form.endDate) {
      notify('error', 'اختر التاريخ')
    } else {
      setSkip(false)
    }
  }


  // const exportToExcel = async () => {
  //   try {
  //     dispatch(showLoader())
  //     const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_DAILY_TRANSACTION}?startDate=${form.startDate}&endDate=${form.endDate}`, {
  //       headers: { 'Content-Type': 'blob' },
  //       responseType: 'arraybuffer',
  //       withCredentials: true,
  //     });
  //     const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     saveAs(file, 'data.xlsx');
  //     dispatch(hideLoader())
  //   } catch (err) {
  //     dispatch(hideLoader())
  //     notify('error', err.data.message)
  //   }
  // }


  return (
    <>
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {data &&
        <>
          <div className='d-flex flex-between' style={{ paddingBottom: '3px' }}>
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
            </div>
          </div>
        <ProfitTable
          data={data}
          // reports={transactionReports}
        />
        </>
      }
    </>
  )
}
