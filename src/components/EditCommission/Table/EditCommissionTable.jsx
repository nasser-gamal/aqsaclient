/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useUpdateCommissionMutation } from '../../../app/features/commissions/commissionApi';
import Spinner from '../../UI/Loader/Spinner';
import { notify } from '../../../utils/notify';
import { Button, Table, TextInput } from '@mantine/core';
import CustomTable from '../../common/CustomTable/CustomTable';

export default function EditCommissionTable({ data, isLoading, isFetching }) {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    commissions: []
  });

  useEffect(() => {
    const commissions = [];
    if (data) {
      data?.commissions.forEach((commission) => {
        // Assuming subcategories are available within the category object
        const subCategories = commission?.commissionItems.map((item) => ({
          id: item.id,
          amount: 0,
          count: 0,
        }));
        commissions.push({
          commision: commission.id,
          subCategories: subCategories,
        });
      });
      setForm({ ...form, commissions })
    }
  }, [data])

  const theads = [
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
    // const updatedCommissions = [...form.commissions];
    // const updatedCommission = { ...updatedCommissions[index] };
    // updatedCommission[name] = value;
    // updatedCommissions[index] = updatedCommission;

    // setForm((prevForm) => ({
    //   ...prevForm,
    //   commissions: updatedCommissions,
    // }));
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
    if (commission.amountTotal >= 0 || commission.count >= 0) {
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



  const rows = data?.commissions?.map((element, index) => (
    <Table.Tr key={element.id} className={element?.isDeleted == true ? 'deleted-row' : ''}>
      <Table.Td>
        {element?.segment?.service?.name}
      </Table.Td>
      <Table.Td>
        <TextInput m={'10 0'}
          type='text'
          name='amountTotal'
          placeholder={'ادخل القيمة'}
          value={form?.commissions[index]?.amountTotal || 0}
          onChange={(e) => onChange(e, index)}
        />
      </Table.Td>
      <Table.Td>
        <TextInput m={'10 0'}
          type='text'
          name='count'
          placeholder={'عدد العمليات'}
          value={form?.commissions[index]?.count || 0}
          onChange={(e) => onChange(e, index)}
        />
      </Table.Td>
      <Table.Td>
        <Button
          type={'button'}
          size="xs"
          onClick={() => onClick(element.id, index)}
          disabled={form?.commissions[index]?.amountTotal < 0 || !form?.commissions[index]?.count < 0}
        >
          تعديل
        </Button>
      </Table.Td>
    </Table.Tr >
  ));

  return (
    <>
      <CustomTable theads={theads} rows={rows} />
    </>
  )
}
