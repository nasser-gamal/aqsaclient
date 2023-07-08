/* eslint-disable react/prop-types */
import CustomButton from '../../../common/Button/CustomButton';
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { useState } from 'react';
import { months } from './months';
import CustomInput from '../../../common/FormFields/input/CustomInput';

import './searchDate.modules.css';

export default function SearchDate({ query, setQuery, setSkip }) {


  const [isClicked, setIsClicked] = useState(false);
  const [dropHeading, setDropHeading] = useState('اختر الشهر');

  const onClick = () => {
    setSkip(false);
  }


  const handleClick = (month) => {
    setIsClicked(!isClicked);
    setDropHeading(month.name);
    setQuery({ ...query, month: month.id })
    setSkip(true)
  }


  return (
    <div className='search-date '>
      <div className='d-flex flex-center flex-wrap' style={{ width: '100%' }}>
        <CustomSelect
          dropHeading={dropHeading}
          label={'اختر الشهر'}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          onClick={() => setIsClicked(!isClicked)}
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
        <CustomInput
          type='text'
          label='بيانات العميل'
          name='search'
          placeholder={'ادخل رقم الموبايل او الرقم القومي'}
          onChange={(e) => {
            setQuery({ ...query, searchValue: e.target.value })
            setSkip(true)
          }}
        />
      </div>
      <div className='text-center'>
        <CustomButton
          type='button'
          classes={'add-btn'}
          width='80px'
          height='30px'
          fontSize='20px'
          marginTop='5px'
          onClick={onClick}
          disabled={!query.searchValue || !query.month}
        >
          بحث
        </CustomButton>
      </div>
    </div>
  )
}
