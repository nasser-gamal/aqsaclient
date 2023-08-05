/* eslint-disable react/prop-types */
import { useState } from 'react'
import CustomSelect from '../../common/FormFields/Select/CustomSelect';

export default function Year({ form, setForm }) {

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


  const handleChange = (year) => {
    setForm({ ...form, year })
  }

  return (
    <div style={{
      width: '200px'
    }}>
      <CustomSelect
        dropHeading={dropHeading}
        label={'السنة'}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        onClick={() => {
          setIsClicked(!isClicked)
        }}
      >
        {
          yearOptions.map((year, index) => {
            return <li
              key={index}
              onClick={() => {
                setDropHeading(year)
                setIsClicked(!isClicked);
                handleChange(year);
              }}
            >
              {year}
            </li>
          })
        }
      </CustomSelect>
    </div>
  )
}
