/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { useFindAllUsersQuery } from '../../../../app/features/user/userApi';

export default function DropDown({ form, setForm, setSkip }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الموظف');

  const { data, isLoading } = useFindAllUsersQuery();
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }


  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'اختر الحساب'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setIsClicked(!isClicked)
        setSkip(true)
      }}
    >
      {
        data?.users.filter(user => {
          const value = searchValue;
          return value ? user.userName.includes(value.toLowerCase()) : user;
        }).map(user => {
          return <li
            key={user.id}
            onClick={() => {
              setDropHeading(user.userName);
              setIsClicked(!isClicked);
              setForm({ ...form, userId: user.id })
            }}
          >
            {
              user.userName
            }
          </li>
        })
      }
    </CustomSelect>
  )
}
