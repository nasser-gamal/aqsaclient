/* eslint-disable react/prop-types */
import { useState } from 'react'
import CustomSelect from '../../common/FormFields/Select/CustomSelect';
import { months } from '../../../utils/months';

export default function Date({ form, setForm }) {

  const [dropHeading, setDropHeading] = useState()
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (month) => {
    setForm({ ...form, month })
  }

  return (
    <div style={{
      width: '200px'
    }}>
      <CustomSelect
        dropHeading={dropHeading}
        label={'اختر الشهر'}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        onClick={() => setIsClicked(!isClicked)}
      >
        {
          months?.map(month => {
            return <li
              key={month.id}
              onClick={() => {
                setDropHeading(month.name)
                setIsClicked(!isClicked);
                handleChange(month.id);
              }}
            >
              {month.name}
            </li>
          })
        }
      </CustomSelect>
    </div>
  )
}
