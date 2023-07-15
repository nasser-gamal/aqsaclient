/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import CustomSelect from '../../common/FormFields/Select/CustomSelect';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useFindAllBanksQuery } from '../../../app/features/bank/bankApi';

export default function DropDown({ form, setForm }) {
  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر البنك');

  const { data, isLoading: isLoading } = useFindAllBanksQuery();

  // const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [isLoading, dispatch]);



  // const filterSelectOptions = (e) => {
  //   const { value } = e.target;
  //   setSearchValue(value)
  // }


  useEffect(() => {
    const bank = data?.banks?.filter(bank => bank.id == form.bankId);
    if (bank && bank.length > 0) {
      setDropHeading(bank[0]?.bankName);
      setForm({ ...form, bankId: bank[0]?.id });
    }
  }, [data?.banks, data])

  return (
    <CustomSelect
      // searchInput={true}
      // onChange={(e) => filterSelectOptions(e)}
      dropHeading={dropHeading}
      label={'اختر الخدمة'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => setIsClicked(!isClicked)}
    >
      {
        data?.banks?.filter(bank => {
          // const value = searchValue;
          // return value ? bank.name.startsWith(value.toLowerCase()) : bank;
          return bank
        }).map(bank => {
          return <li
            key={bank.id}
            onClick={() => {
              setDropHeading(bank.bankName);
              setIsClicked(!isClicked);
              setForm({ ...form, bankId: bank.id })
            }}
          >
            {
              bank.bankName
            }
          </li>
        })
      }
    </CustomSelect>
  )
}
