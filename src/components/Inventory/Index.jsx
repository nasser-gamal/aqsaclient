import { useEffect, useState } from "react";
import DaySelect from "./Date/Date";
import { useFindInventoryQuery } from "../../app/features/inventory/inventoryApi";
import { notify } from "../../utils/notify";
import { getCurrentDateTime } from "../../utils/formatDate";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";


import { TbRefresh } from 'react-icons/tb';
import InventoryTable from "./Table/InventoryTable";

export default function Index() {
  const dispatch = useDispatch()


  const [form, setForm] = useState({
    startDate: getCurrentDateTime(),
    endDate: getCurrentDateTime(),
  });

  const [skip, setSkip] = useState(true);

  const { data, isLoading, isFetching, refetch } = useFindInventoryQuery({
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
      {data &&
        <>
          <TbRefresh style={{
            fontSize: '26px',
            color: 'black',
            cursor: 'pointer'
          }}
            onClick={() => refetch()}
          />
          <InventoryTable data={data} isLoading={isLoading} />
        </>
      }
    </>
  )
}
