/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useFindAllBankAccountsQuery } from '../../../app/features/bankAccount/bankAccountApi';
import { Select } from '@mantine/core';

export default function DropDown({ features, setFeatures, disabled, defaultValue, setSkip }) {
  const dispatch = useDispatch()

  const { data, isLoading: isLoading } = useFindAllBankAccountsQuery({
    limit: 100000,
    sort: '-createdAt',
    keyword: '',
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const options = data?.data.map((bank) => ({
    value: `${bank?.id}`,
    label: bank?.accountName,
  })) || [];


  const onChange = (value) => {
    setFeatures({ ...features, bankAccountId: value });
    setSkip(true)
  }


  return (
    <Select
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
