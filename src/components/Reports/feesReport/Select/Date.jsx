/* eslint-disable react/prop-types */
import CustomButton from '../../../common/Button/CustomButton';
import CustomInput from '../../../common/FormFields/input/CustomInput';

export default function DaySelect({ form, setForm, onClick, setSkip }) {

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
    setSkip(true)
  }



  return (
    <div style={{
      margin: '0 auto 20px',
    }}>
      <div className='d-flex' style={{
        width: "600px",
        maxWidth: '100%',
        margin: 'auto',
        gap: '20px'
      }}>
        <CustomInput
          type={'date'}
          label='من'
          name='startDate'
          value={form.startDate}
          onChange={(e) => onChange(e)}
          width={'48%'}

        />
        <CustomInput
          type={'date'}
          label='إلي'
          name='endDate'
          value={form.endDate}
          onChange={(e) => onChange(e)}
          width={'48%'}
        />
      </div>
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
