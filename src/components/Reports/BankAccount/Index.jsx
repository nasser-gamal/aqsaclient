import Pagination from "../../Pagination/Pagination";
import DropDown from "./DropDown";
import BankReportTable from "./Table/BankReportTable";
import { useState } from "react";
import { useFindUserTransactionsQuery } from "../../../app/features/reports/reportsApi";
import Date from "./Date";
import CustomButton from "../../common/Button/CustomButton";
import { validateReport } from "../../../utils/validation";
import { notify } from '../../../utils/notify';

export default function Index() {

  const [form, setForm] = useState({
    bankNumber: "",
    startDate: "",
    endDate: ""
  });

  const [skip, setSkip] = useState(true);

  const { data, isFetching } = useFindUserTransactionsQuery({
    bankNumber: form.bankNumber,
    startDate: form.startDate,
    endDate: form.endDate
  }, { skip });


  const handleClick = () => {
    const error = validateReport(form);
    if (error) {
      notify('error', error)
    } else {
      setSkip(false)
    }
  }


  return (
    <>
      <div style={{
        margin: "20px 0"
      }}>
        <DropDown form={form} setForm={setForm} setSkip={setSkip} />
        <Date form={form} setForm={setForm} setSkip={setSkip} />
        <div className="text-center">
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
      {data && data?.transactions.length > 0 && <BankReportTable form={form} data={data} isLoading={isLoading} />}
      {data && data?.transactions.length < 1 && <div
        style={{
          textAlign: 'center',
          fontsize: '26px',
        }}
      ><span>لا توجد عمليات</span></div>}
      {/* <Pagination /> */}
    </>
  )
}
