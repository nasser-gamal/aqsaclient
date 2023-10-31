/* eslint-disable react/prop-types */
import CustomInput from '../../common/FormFields/input/CustomInput'
import CustomButton from '../../common/Button/CustomButton';


export default function ReportPeriod({ form, setForm, setSkip, setShowForm }) {

  const onSubmit = (e) => {
    e.preventDefault()
    if (form.bankAccountId) {
      setSkip(false)
    }
  }


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
    setSkip(true)
  }

  return (
    <div style={{ borderTop: '1px solid black', padding: '10px 0', margin: '25px 0 0' }}>
      <div style={{ width: '600px', maxWidth: '100%', margin: 'auto' }}>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '50%' }}>
              <CustomInput
                type='date'
                name='startDate'
                value={form.startDate}
                label={'من'}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div style={{ width: '50%' }}>
              <CustomInput
                type='date'
                name='endDate'
                value={form.endDate}
                label={'إلي'}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className='d-flex flex-center form-btns'>
            <CustomButton
              type='submit'
              classes={'add-btn'}
              width={'80px'}
              height={'30px'}
              fontSize={'18px'}
            >
              بحث
            </CustomButton>
            <CustomButton
              type='button'
              classes={'cancel-btn'}
              width={'80px'}
              height={'30px'}
              fontSize={'18px'}
              onClick={() => {
                setSkip(true)
                setShowForm(false)
              }}
            >
              إلغاء
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  )
}
