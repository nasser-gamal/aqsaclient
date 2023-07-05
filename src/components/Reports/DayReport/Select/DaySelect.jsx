import CustomButton from '../../../common/Button/CustomButton';
import CustomInput from '../../../common/FormFields/input/CustomInput';

export default function DaySelect() {

  return (
    <div style={{
      width: '300px',
      margin: '0 auto 20px',
    }}>
      <CustomInput type={'date'} label='اختر التاريخ' />
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
