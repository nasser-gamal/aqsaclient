/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useFindAllBanksQuery } from '../../../app/features/bank/bankApi';
import { Select } from '@mantine/core';

export default function DropDown({ form, setForm, disabled, defaultValue }) {
  const dispatch = useDispatch()

  const { data, isLoading: isLoading } = useFindAllBanksQuery({ limit: 10000 });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const options = data?.data.map((bank) => ({
    value: `${bank?.id}`,
    label: bank?.bankName,
  })) || [];


  const onChange = (value) => {
    setForm({ ...form, bankId: value });
  }


  return (
    <Select
      w={'100%'}
      m={'10 0'}
      label="اختر البنك"
      data={options}
      onChange={onChange}
      disabled={disabled}
      defaultSearchValue={defaultValue}
      searchable
      nothingFoundMessage="غير موجود ..."
      allowDeselect={false}

    />
  )
}
