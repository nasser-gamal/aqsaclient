/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../../app/features/loader/loaderSlice";
import { useFindAllUsersQuery } from "../../../app/features/user/userApi";
import { Select } from "@mantine/core";

export default function Agents({ form, setForm, setSkip, disabled }) {
  const dispatch = useDispatch()

  const { data, isLoading } = useFindAllUsersQuery({ limit: 10000, roleId: 3 });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const options = data?.data.map((element) => ({
    value: `${element?.id}`,
    label: element?.accountName,
  })) || [];


  const onChange = (value) => {
    setForm({ ...form, agentId: value });
    if (setSkip) {
      setSkip(true)
    }
  }


  return (
    <Select
      m={'10 0'}

      w={'100%'}
      label="اختر الوكيل"
      data={options}
      onChange={onChange}
      disabled={disabled}
      searchable
      nothingFoundMessage="الخدمة غير موجودة..."
      allowDeselect={false}

    />
  )
}
