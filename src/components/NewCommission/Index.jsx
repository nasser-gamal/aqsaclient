import { useEffect, useState } from "react";
import CustomButton from "../common/Button/CustomButton";
import Agents from "./Form/Agents";
import CommissionTable from "./Form/CommissionTable";


import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import { useCreateCommissionMutation } from "../../app/features/commissions/commissionApi";
import { useDispatch } from "react-redux";

import { notify } from "../../utils/notify";
import Date from "./Form/Date";
import { validateCommission } from "../../utils/validation";

export default function Index() {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    agentId: "",
    month: '',
    year: 2023,
    commissions: [],
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
      const error = validateCommission(form);
      if (error) {
        notify('error', error);
      } else {
        const response = await createCommission(form).unwrap()
        notify('success', response.message);
        resetForm()
      }
    } catch (err) {
      notify('error', err.data.message);
    }
  }


  const resetForm = () => {
    const commissons = [...form.commissions];
    const resetCommissions = commissons.map((commission) => {
      commission.amountTotal = 0;
      commission.count = 0;
      return commission;
    })
    setForm({
      agentId: '',
      month: '',
      commissions: resetCommissions
    })
  }

  return (
    <>
      <div className="d-flex" style={{
        gap: '20px'
      }}>
        <Date form={form} setForm={setForm} />
        <Agents form={form} setForm={setForm} />
      </div>
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
