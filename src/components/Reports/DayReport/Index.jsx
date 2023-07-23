import { useEffect, useState } from "react";
import Pagination from '../../UI/Pagination/Pagination';
import DaySelect from "./Select/Date";
import DayTable from "./Table/DayTable";
import { useFindDailyTransactionsQuery } from "../../../app/features/reports/reportsApi";
import { notify } from "../../../utils/notify";
import { DateInput } from "../../../utils/formatDate";
import CustomButton from "../../common/Button/CustomButton";
import EntrySelect from "../../UI/LimitSelect/EntrySelect";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";
import axios from "axios";
import apiEndpoints from "../../../utils/endPoints";
import { saveAs } from 'file-saver'

export default function Index() {
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching } = useFindDailyTransactionsQuery({
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


  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_TRANSACTION}?bankNumber=${form.bankNumber}&startDate=${form.startDate}&endDate=${form.endDate}`, {
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
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {data && data?.transactions?.transactions.length > 0 &&
        <>
          <div className='d-flex flex-between' style={{ paddingBottom: '3px' }}>
            <CustomButton
              type='button'
              classes={'add-btn'}
              width={'80px'}
              height={'30px'}
              fontSize={'20px'}
              onClick={exportToExcel}
            >تصدير
            </CustomButton>
            <EntrySelect />
          </div>
          <DayTable form={form} data={data} isLoading={isLoading} />
        </>
      }
      {data && data?.transactions?.transactions.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>}
      {data?.transactions?.pagination?.hasPagination && <Pagination pagination={data?.transactions?.pagination} />}
    </>
  )
}
