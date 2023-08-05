/* eslint-disable react/prop-types */
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { useState } from 'react';

import './searchDate.modules.css';

export default function YearDate({ query, setQuery, setSkip }) {

  const yearOptions = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  for (let i = 0; i < 11; i++) {
    const year = currentYear - i;
    if (i === 10 && currentMonth < 10) {
      continue;
    }
    yearOptions.push(year);
  }

  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState(new Date().getFullYear());


  const handleClick = (year) => {
    setIsClicked(!isClicked);
    setDropHeading(year);
    setQuery({ ...query, year: year })
    setSkip(true)
  }


  return (
    <CustomSelect
      dropHeading={dropHeading}
      label={'السنة'}
      isClicked={isClicked}
      setIsClicked={setIsClicked}
      onClick={() => {
        setSkip(true)
        setIsClicked(!isClicked)
      }}
    >
      {
        yearOptions.map((year, index) => {
          return <li
            key={index}
            onClick={() => {
              handleClick(year)
            }}
          >
            {year}
          </li>
        })
      }
    </CustomSelect>
  )
}
