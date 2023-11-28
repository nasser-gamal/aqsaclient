import { useEffect, useState } from "react";
import Agents from "./Form/Agents";
import CommissionTable from "./Form/CommissionTable";


import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import { useCreateCommissionMutation } from "../../app/features/commissions/commissionApi";
import { useDispatch } from "react-redux";

import { notify } from "../../utils/notify";
import Year from "./Form/year";
import Month from "./Form/Month";
import { validateCommission } from "../../utils/validation";
import { useFindAllCategoriesQuery } from "../../app/features/category/categoryApi";
import { Button, Grid } from "@mantine/core";
import { months } from "../../utils/months";

export default function Index() {
  const dispatch = useDispatch()



  const { data, isLoading: categoryLoading } = useFindAllCategoriesQuery({ limit: 10000 });


  var currentDate = new Date();
  var currentMonthIndex = currentDate.getMonth();

  const [form, setForm] = useState({
    agentId: "",
    month: months[currentMonthIndex],
    year: new Date().getFullYear(),
    commissions: [],
  });

  const onChange = (e, categoryIndex, subCategoryIndex) => {
    // const { name, value } = e.target;
    // const data = [...form.commissions];
    // data[serviceId][name] = value;
    // setForm({ ...form, commissions: data });

    const { name, value } = e.target;

    // Make a copy of the form state to avoid mutating it directly
    const updatedForm = { ...form };
    // console.log('updae', updatedForm.commissions[categoryIndex].subCategories[subCategoryIndex][name])

    // Update the amount or count based on the input name and category index
    updatedForm.commissions[categoryIndex].subCategories[subCategoryIndex][name] = Number(value);

    // Update the state with the modified form
    setForm(updatedForm);
  };


  const [createCommission, { isLoading }] = useCreateCommissionMutation()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);



  const onSubmit = async (e) => {
    e.preventDefault()
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
      console.log(err)
      notify('error', err.data.message);
    }
  }


  const resetForm = () => {
    const commissions = [];
    data?.categories.map((category) => {
      return commissions.push({ serviceId: category.id, amountTotal: 0, count: 0 })
    })
    setForm({ ...form, commissions })
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid mb={20} justify="center" align="center">
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Year
            form={form}
            setForm={setForm}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Month
            form={form}
            setForm={setForm}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 3, md: 3, lg: 3 }}>
          <Agents
            form={form}
            setForm={setForm}
          />
        </Grid.Col>
      </Grid>
      <CommissionTable
        data={data?.data}
        isLoading={categoryLoading}
        form={form}
        setForm={setForm}
        onChange={onChange}
      />
      <div className="text-center" style={{
        marginTop: '20px '
      }}>
        <Button
          type='submit'
        >
          إضافة
        </Button>
      </div>
    </form>
  )
}
