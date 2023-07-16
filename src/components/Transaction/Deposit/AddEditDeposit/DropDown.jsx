/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { hideLoader, showLoader } from '../../../../app/features/loader/loaderSlice';
import { useFindAllBankAccountsQuery } from '../../../../app/features/bankAccount/bankAccountApi';

export default function DropDown({ form, setForm, setBalance }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الحساب');

  const { data, isLoading } = useFindAllBankAccountsQuery();
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



  // useEffect(() => {
  //   const service = data?.categories?.filter(category => category.id == form.serviceId);
  //   if (service && service.length > 0) {
  //     setDropHeading(service[0]?.name);
  //     setForm({ ...form, serviceId: service[0]?.id });
  //   }
  // }, [data?.categories, data])

  return (
    <CustomSelect
      searchInput={true}
      onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'اختر الخدمة'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => setIsClicked(!isClicked)}
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
              setBalance({
                before: bankAccount.balance.toFixed(2), after: (+bankAccount.balance + +form.amount).toFixed(2)
              });
              setForm({ ...form, bankAccountId: bankAccount.id })
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
