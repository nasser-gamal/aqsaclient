import { useEffect, useState } from "react";
import Pagination from '../../components/UI/Pagination/Pagination';
import DaySelect from "./Date/Date";
import { useFindAllProfitsQuery } from "../../app/features/treasury/profitsApi";
import { notify } from "../../utils/notify";
import { DateInput } from "../../utils/formatDate";
import CustomButton from "../../components/common/Button/CustomButton";
import EntrySelect from "../../components/UI/LimitSelect/EntrySelect";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import axios from "axios";
import apiEndpoints from "../../utils/endPoints";
import { saveAs } from 'file-saver'


import { TbRefresh } from 'react-icons/tb';
import ProfitTable from "./Table/ProfitTable";

export default function Index() {
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: DateInput(),
    endDate: DateInput(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useFindAllProfitsQuery({
    startDate: form.startDate,
    endDate: form.endDate,
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

  console.log(data)

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
      <DaySelect form={form} setForm={setForm} onClick={handleClick} setSkip={setSkip} />
      {data &&
        <>
          <div className='d-flex flex-between' style={{ paddingBottom: '3px' }}>
            {/* <CustomButton
              type='button'
              classes={'add-btn'}
              width={'80px'}
              height={'30px'}
              fontSize={'20px'}
              onClick={exportToExcel}
            >تصدير
            </CustomButton> */}
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
          <ProfitTable form={form} data={data} isLoading={isLoading} />
        </>
      }
      {/* {data  && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>} */}
    </>
  )
}
