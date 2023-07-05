import CustomButton from '../../../common/Button/CustomButton';
import CustomSelect from '../../../common/FormFields/Select/CustomSelect';
import { useState } from 'react';

export default function EmploySelect() {

  const [dropHeading, setDropHeading] = useState()
  const [isClicked, setIsClicked] = useState('اختر الموظف')

  return (
    <div style={{
      width: '300px',
      margin: '0 auto 20px',
    }}>
      <CustomSelect
        // searchInput={true}
        dropHeading={dropHeading}
        label={'اختر الموظف'}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        onClick={() => setIsClicked(!isClicked)}
      >
        <li
          onClick={() => {
            setDropHeading("فودافون كاش");
            setIsClicked(!isClicked);
          }}
        >
          فودافون كاش
        </li>
        <li
          onClick={() => {
            setDropHeading("بنك مصر");
            setIsClicked(!isClicked);
          }}
        >
          بنك مصر
        </li>
      </CustomSelect>
      <div className='text-center'>
        <CustomButton
          type='button'
          classes={'add-btn'}
          width='60px'
          height='30px'
          fontSize={'20px'}
          marginTop={'10px'}
        >
          بحث
        </CustomButton>
      </div>
    </div>
  )
}
