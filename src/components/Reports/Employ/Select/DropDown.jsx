/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { useFindAllUsersQuery } from '../../../../app/features/user/userApi';
import { Select } from '@mantine/core';

export default function DropDown({ features, setFeatures, disabled, defaultValue, setSkip }) {
  const dispatch = useDispatch()

  const { data, isLoading: isLoading } = useFindAllUsersQuery({ 'roleId[ne]': 3 });


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const options = data?.data.map((user) => ({
    value: `${user?.id}`,
    label: user?.accountName,
  })) || [];


  const onChange = (value) => {
    setFeatures({ ...features, createdBy: value });
    setSkip(true)
  }


  return (
    <Select
      m={'10 0'}
      label="اختر المستخدم"
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
