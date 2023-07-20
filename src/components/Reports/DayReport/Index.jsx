import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import DaySelect from "./Select/Date";
import DayTable from "./Table/DayTable";
import { useFindDailyTransactionsQuery } from "../../../app/features/reports/reportsApi";
import { notify } from "../../../utils/notify";

export default function Index() {


  const [form, setForm] = useState({
    date: "",
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching } = useFindDailyTransactionsQuery({
    date: form.date,
  }, { skip });

  console.log(data)
  const handleClick = () => {
    console.log(isFetching)
    if (!form.date) {
      notify('error', 'اختر التاريخ')
    } else {
      setSkip(false)
    }
  }

  return (
    <>
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {/* <Pagination /> */}
      {data && data?.transactions?.transactions.length > 0 && <DayTable form={form} data={data} isLoading={isLoading} />}
      {data && data?.transactions?.transactions.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>}
    </>
  )
}
