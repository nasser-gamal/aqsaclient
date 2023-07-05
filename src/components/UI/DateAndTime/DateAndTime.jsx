/* eslint-disable react/prop-types */
import { formattedDate, formattedTime } from '../../../utils/formatDate'

export default function DateAndTime({createdAt}) {
  return (
    <>
      <span style={{
        display: 'block',
      }}>
        {formattedDate(createdAt)}
      </span>
      <span style={{
        display: 'block',
      }}>
        {formattedTime(createdAt)}
      </span>
    </>
  )
}
