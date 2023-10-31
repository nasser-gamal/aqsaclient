/* eslint-disable react/prop-types */
import { useState } from 'react'

import CustomSelect from '../common/FormFields/Select/CustomSelect';

export default function DropDown({ form, setForm, setBalance, setSkip, data }) {

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');

  const [searchValue, setSearchValue] = useState()




  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }


  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setIsClicked(!isClicked)
        setSkip(true)
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
