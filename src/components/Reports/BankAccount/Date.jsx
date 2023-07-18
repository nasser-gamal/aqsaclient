/* eslint-disable react/prop-types */
import CustomInput from '../../common/FormFields/input/CustomInput'

export default function Date({ form, setForm, setSkip }) {

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
    setSkip(true)
  }

  return (
    <div>
      <CustomInput
        type='date'
        name='startDate'
        value={form.startDate}
        label={'من'}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='date'
        name='endDate'
        value={form.endDate}
        label={'إلي'}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}
