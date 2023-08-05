/* eslint-disable react/prop-types */
import CustomButton from '../../../common/Button/CustomButton';
import CustomInput from '../../../common/FormFields/input/CustomInput';

import './searchDate.modules.css';

import Date from './Date';

export default function SearchDate({ query, setQuery, setSkip }) {

  const onClick = () => {
    setSkip(false);
  }


  return (
    <div className='search-date '>
      <div className='d-flex flex-center flex-wrap' style={{ width: '100%' }}>
        <Date query={query} setQuery={setQuery} setSkip={setSkip} />
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
