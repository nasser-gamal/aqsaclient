import { useEffect, useState } from "react";
import CustomButton from "../common/Button/CustomButton";
import Agents from "./Form/Agents";
import CommissionTable from "./Form/CommissionTable";


import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import { useCreateCommissionMutation } from "../../app/features/commissions/commissionApi";
import { useDispatch } from "react-redux";

import { notify } from "../../utils/notify";

export default function Index() {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    commissions: [],
    agentId: "",
  });


  const onChange = (e, serviceId) => {
    const { name, value } = e.target;
    const data = [...form.commissions];
    data[serviceId][name] = value;
    setForm({ ...form, commissions: data });
  };


  const [createCommission, { isLoading }] = useCreateCommissionMutation()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);



  const onClick = async () => {
    try {
      const response = await createCommission(form).unwrap()
      notify('success', response.message);
      resetForm()
    } catch (error) {
      notify('error', error.data.message);
    }
  }


  const resetForm = () => {
    setForm({
      serviceId: "",
      agentId: "",
      count: "",
      amountTotal: "",
    })
  }

  return (
    <>
      <Agents form={form} setForm={setForm} />
      <CommissionTable form={form} setForm={setForm} onChange={onChange} />
      <div className="text-center" style={{
        marginTop: '20px '
      }}>
        <CustomButton
          classes={'add-btn'}
          width={'80px'}
          height={'30px'}
          fontSize={'18px'}
          onClick={onClick}
        >
          إضافة
        </CustomButton>
      </div>
    </>
  )
}
