/* eslint-disable react/prop-types */
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { useState } from 'react';
import { months } from '../../../../utils/months';

import './searchDate.modules.css';

export default function MonthDate({ query, setQuery, setSkip }) {



  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الشهر');

  const handleClick = (month) => {
    setIsClicked(!isClicked);
    setDropHeading(month.name);
    setQuery({ ...query, month: month.id })
    setSkip(true)
  }


  return (
    <CustomSelect
      dropHeading={dropHeading}
      label={'الشهر'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setSkip(true)
        setIsClicked(!isClicked)
      }}
    >
      {
        months.map(month => {
          return <li
            key={month.id}
            onClick={() => {
              handleClick(month)
            }}
          >
            {month.name}
          </li>
        })
      }
    </CustomSelect>
  )
}
