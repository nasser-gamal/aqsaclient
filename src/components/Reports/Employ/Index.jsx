import { useEffect, useState } from "react";
import { DateInput } from "../../../utils/formatDate";
import Pagination from '../../UI/Pagination/Pagination';
import EmployReportTable from "./Table/EmployReportTable";
import { useFindEmployTransactionsQuery } from "../../../app/features/reports/reportsApi";
import { validateEmployReport } from "../../../utils/validation";
import { notify } from "../../../utils/notify";
import DropDown from "./Select/DropDown";
import Date from "../BankAccount/Date";
import CustomButton from "../../common/Button/CustomButton";

import EntrySelect from "../../UI/LimitSelect/EntrySelect";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";
import { resetFilter } from "../../../app/features/filter/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import apiEndpoints from "../../../utils/endPoints";
import { saveAs } from 'file-saver'

import './employ.modules.css';
import { TbRefresh } from 'react-icons/tb';


export default function Index() {
  const { page, limit, orderBy } = useSelector(state => state.filter);
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    userId: "",
    startDate: DateInput(),
    endDate: DateInput()
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useFindEmployTransactionsQuery({
    userId: form.userId,
    startDate: form.startDate,
    endDate: form.endDate,
    page,
    limit,
    order: orderBy,
    sort: "ASC"
  }, { skip });


  const handleClick = () => {
    const error = validateEmployReport(form);
    if (error) {
      notify('error', error)
    } else {
      setSkip(false)
    }
  }

  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  useEffect(() => {
    dispatch(
      resetFilter()
    );
  }, []);


  const exportToExcel = async () => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.reports.EXPORT_EMPLOY_TRANSACTION}?userId=${form.userId}&startDate=${form.startDate}&endDate=${form.endDate}`, {
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
      <div className="acc-report" style={{
        margin: "20px 0"
      }}>
        <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
          <DropDown form={form} setForm={setForm} setSkip={setSkip} />
          <Date form={form} setForm={setForm} setSkip={setSkip} />
        </div>
        <div className="text-center" style={{ marginTop: '15px' }}>
          <CustomButton
            type='button'
            classes={'add-btn'}
            width={'80px'}
            height={'30px'}
            fontSize={'20px'}
            onClick={handleClick}
          >بحث
          </CustomButton>
        </div>
      </div>
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
            <span>
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
          <EmployReportTable form={form} data={data} isLoading={isLoading} />
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
