import { useState } from "react";
import { DateInput } from "../../../utils/formatDate";
import Pagination from "../../Pagination/Pagination";
import EmployReportTable from "./Table/EmployReportTable";
import { useFindEmployTransactionsQuery } from "../../../app/features/reports/reportsApi";
import { validateEmployReport } from "../../../utils/validation";
import { notify } from "../../../utils/notify";
import DropDown from "./Select/DropDown";
import Date from "../BankAccount/Date";
import CustomButton from "../../common/Button/CustomButton";

import './employ.modules.css';

export default function Index() {

  const [form, setForm] = useState({
    userId: "",
    startDate: DateInput(),
    endDate: DateInput()
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading } = useFindEmployTransactionsQuery({
    userId: form.userId,
    startDate: form.startDate,
    endDate: form.endDate
  }, { skip });


  const handleClick = () => {
    const error = validateEmployReport(form);
    if (error) {
      notify('error', error)
    } else {
      setSkip(false)
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
      {data && data?.transactions?.transactions.length > 0 && <EmployReportTable form={form} data={data} isLoading={isLoading} />}
      {data && data?.transactions?.transactions.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>}
       {/* <Pagination /> */}
    </>
  )
}
