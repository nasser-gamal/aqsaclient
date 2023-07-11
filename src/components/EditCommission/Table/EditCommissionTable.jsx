/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import CustomButton from '../../common/Button/CustomButton';
import Table from '../../common/Table/Table';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useUpdateCommissionMutation } from '../../../app/features/commissions/commissionApi';
import Spinner from '../../UI/Loader/Spinner';
import { notify } from '../../../utils/notify';

export default function EditCommissionTable({ data, isLoading, isFetching }) {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    commissions: []
  });

  useEffect(() => {
    if (data?.commissions) {
      setForm({ ...form, commissions: data?.commissions })
    }

  }, [data?.commissions]);

  const tableHead = [
    {
      title: "الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "القيمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عدد العمليات",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
  ];



  const onChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCommissions = [...form.commissions];
    const updatedCommission = { ...updatedCommissions[index] };
    updatedCommission[name] = value;
    updatedCommissions[index] = updatedCommission;

    setForm((prevForm) => ({
      ...prevForm,
      commissions: updatedCommissions,
    }));
  };


  const [updateCommission, { isLoading: updateLoading }] = useUpdateCommissionMutation();




  useEffect(() => {
    if (updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [updateLoading, dispatch]);


  const onClick = async (commissionId, index) => {
    const commission = form.commissions[index];
    if (commission.amountTotal && commission.count) {
      try {
        const response = await updateCommission({ commissionId, form: commission }).unwrap();
        notify('success', response.message);
      } catch (err) {
        notify('error', err.data.message);
      }
    }
  };


  if (isLoading || isFetching) {
    return <Spinner />
  }
 

  return (
    <>
      {
        data?.commissions && data?.commissions.length > 0 && <div style={{ marginTop: '20px' }}>
          <Table tableHead={tableHead} isLoading={isLoading}>
            <tbody>
              {
                data?.commissions?.map((commission, index) => {
                  return <tr key={commission.id}>
                    <td>
                      {commission?.segment?.service.name}
                    </td>
                    <td>
                      <CustomInput
                        type='text'
                        name='amountTotal'
                        placeholder={'ادخل القيمة'}
                        value={form?.commissions[index]?.amountTotal || ""}
                        onChange={(e) => onChange(e, index)}
                      />
                    </td>
                    <td>
                      <CustomInput
                        type='text'
                        name='count'
                        placeholder={'عدد العمليات'}
                        value={form?.commissions[index]?.count || ""}
                        onChange={(e) => onChange(e, index)}
                      />
                    </td>
                    <td>
                      <CustomButton
                        classes={'edit-btn'}
                        width='65px'
                        height='30px'
                        fontSize="17px"
                        onClick={() => onClick(data?.userCommission.id, index)}
                        disabled={!form?.commissions[index]?.amountTotal || !form?.commissions[index]?.count}
                      >
                        تعديل
                      </CustomButton>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        </div>
      }
      {
        data?.commissions && data?.commissions.length < 1 || !data && <div style={{
          textAlign: "center",
          marginTop: '30px',
          fontSize: '19px',
        }}>
          <span>لا يوجد عمولة</span>
        </div >
      }
    </>

  )
}
