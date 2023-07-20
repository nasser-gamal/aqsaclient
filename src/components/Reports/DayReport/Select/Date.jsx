/* eslint-disable react/prop-types */
import CustomButton from '../../../common/Button/CustomButton';
import CustomInput from '../../../common/FormFields/input/CustomInput';

export default function DaySelect({ form, setForm, onClick, setSkip }) {



  return (
    <div style={{
      width: '300px',
      margin: '0 auto 20px',
    }}>
      <CustomInput type={'date'} label='اختر التاريخ' name='date' onChange={(e) => {
        setSkip(true)
        setForm({ ...form, date: e.target.value })
      }} />
      <div className='text-center'>
        <CustomButton
          type='button'
          classes={'add-btn'}
          width='60px'
          height='30px'
          fontSize={'20px'}
          marginTop={'10px'}
          onClick={onClick}
        >
          بحث
        </CustomButton>
      </div>
    </div>
  )
}
