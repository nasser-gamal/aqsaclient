/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import FormButtons from '../../UI/FormButtons/FormButtons'
import CustomInput from '../../common/FormFields/input/CustomInput'

export default function ReportPeriod() {

  const { childrenProps } = useSelector(state => state.modal);
  console.log(childrenProps);



  return (
    <div className=' input-date' style={{ margin: 'auto' }}>
      <form>
        <CustomInput
          type='date'
          name='startDate'
          value={childrenProps?.form.startDate}
          label={'من'}
          onChange={(e) => childrenProps?.setForm(e)}
        />
        <CustomInput
          type='date'
          name='endDate'
          value={childrenProps?.form.endDate}
          label={'إلي'}
          onChange={(e) => childrenProps?.setForm(e)}
        />
        <FormButtons />
      </form>
    </div>
  )
}
