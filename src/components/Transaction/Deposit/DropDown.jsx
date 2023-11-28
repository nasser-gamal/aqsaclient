/* eslint-disable react/prop-types */

import { Select } from '@mantine/core'
import { useFindAllBankAccountsQuery } from '../../../app/features/bankAccount/bankAccountApi';

export default function DropDown({ balance, setBalance, form, setForm, disabled }) {

  const { data } = useFindAllBankAccountsQuery({
    limit: 150000,
    sort: '-createdAt',
});


  const options = data?.data.map((bankAccount) => ({
    value: `${bankAccount?.id}`,
    label: bankAccount?.accountName,
    balanceBefore: bankAccount?.balance
  })) || [];


  const findBalanceBefore = (selectedValue) => {
    const selectedOption = options.find((option) => option.value === selectedValue);
    return selectedOption?.balanceBefore || '';
  };


  const onChange = (value) => {
    const balanceBefore = findBalanceBefore(value);
    setBalance({ ...balance, before: balanceBefore });
    setForm({ ...form, bankAccountId: value });
  }

  return (
    <Select
      m={'10 0'}
      w={'100%'}
      label="اختر الحساب"
      data={options}
      onChange={onChange}
      disabled={disabled}
      searchable
      nothingFoundMessage="غير موجود ..."
      allowDeselect={false}

    />
  )
}
