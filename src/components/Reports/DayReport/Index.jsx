import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import DaySelect from "./Select/Date";
import DayTable from "./Table/DayTable";
import { useFindDailyTransactionsQuery } from "../../../app/features/reports/reportsApi";
import { notify } from "../../../utils/notify";
import { DateInput } from "../../../utils/formatDate";

export default function Index() {


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching } = useFindDailyTransactionsQuery({
    startDate: form.startDate,
    endDate: form.endDate,
  }, { skip });

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
