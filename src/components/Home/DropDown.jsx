/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import CustomSelect from '../common/FormFields/Select/CustomSelect';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { useFindAllBankAccountsQuery } from '../../app/features/bankAccount/bankAccountApi';

export default function DropDown({ form, setForm, setBalance }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');

  const { data, isLoading } = useFindAllBankAccountsQuery({ page: "", limit: "", order: 'createdAt', sort: 'ASC' });
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
        // setSkip(true)
      }}
    >
      {
        data?.bankAccounts.filter(bankAccount => {
          const value = searchValue;
          return value ? bankAccount.accountName.includes(value.toLowerCase()) : bankAccount;
        }).map(bankAccount => {
          return <li
            key={bankAccount.id}
            onClick={() => {
              setDropHeading(bankAccount.accountName);
              setIsClicked(!isClicked);
              setForm({ ...form, bankAccountId: bankAccount.id, bankAccountName: bankAccount.accountName })
              setBalance(bankAccount.balance)
            }}
          >
            {
              bankAccount.accountName
            }
          </li>
        })
      }
    </CustomSelect>
  )
}
