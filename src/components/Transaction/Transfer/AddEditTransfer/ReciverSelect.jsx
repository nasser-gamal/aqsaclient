/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';

export default function ReciverSelect({ bankAccounts, form, setForm, disabled }) {
  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');



  const [searchValue, setSearchValue] = useState()


  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  useEffect(() => {
    const bankAccount = bankAccounts?.filter(bankAccount => bankAccount.id == form.recipientId);
    if (bankAccount && bankAccount.length > 0) {
      setDropHeading(bankAccount[0]?.accountName);
      setForm({ ...form, recipientId: bankAccount[0]?.id });
    }
  }, [bankAccounts]);


  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'المحول إليه'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        if (!disabled) {
          setIsClicked(!isClicked)
        }
      }}
      disabled={disabled}
    >
      {
        bankAccounts?.filter(bankAccount => {
          const value = searchValue;
          return value ? bankAccount.accountName.includes(value.toLowerCase()) : bankAccount;
        }).map(bankAccount => {
          return <li
            key={bankAccount.id}
            onClick={() => {
              setDropHeading(bankAccount.accountName);
              setIsClicked(!isClicked);
              setForm({ ...form, recipientId: bankAccount.id })
            }}
          >
            {
              bankAccount.accountName
            }
          </li>
        })
      }
    </CustomSelect >
  )
}
