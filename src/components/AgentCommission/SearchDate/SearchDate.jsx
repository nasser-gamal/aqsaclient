/* eslint-disable react/prop-types */
import CustomButton from '../../common/Button/CustomButton';
import CustomSelect from '../../common/FormFields/Select/CustomSelect';
import YearDate from '../../UI/Commission/SearchDate/YearDate';
import { useState } from 'react';
import { months } from './months';

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
    <div className='search-date'>
      <div className='d-flex'>
        <YearDate
          query={query}
          setQuery={setQuery}
          setSkip={setSkip}
        />
        <CustomSelect
          dropHeading={dropHeading}
          label={'الشهر'}
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
          disabled={!query.month}
        >
          بحث
        </CustomButton>
      </div>
    </div>
  )
}
