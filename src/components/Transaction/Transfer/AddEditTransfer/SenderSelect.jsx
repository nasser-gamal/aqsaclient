/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';

export default function SenderSelect({ bankAccounts, form, setForm }) {
  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');



  const [searchValue, setSearchValue] = useState()


  const filterSelectOptions = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }


  useEffect(() => {
    const bankAccount = bankAccounts?.filter(bankAccount => bankAccount.id == form.senderId);
    if (bankAccount && bankAccount.length > 0) {
      setDropHeading(bankAccount[0]?.accountName);
      setForm({ ...form, senderId: bankAccount[0]?.id });
    }
  }, [bankAccounts]);



  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'المحول منه'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setIsClicked(!isClicked)
      }
      }
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
              // setBalance({
              //   before: bankAccount.balance.toFixed(2), after: (+bankAccount.balance + +form.amount).toFixed(2)
              // });
              setForm({ ...form, senderId: bankAccount.id })
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
