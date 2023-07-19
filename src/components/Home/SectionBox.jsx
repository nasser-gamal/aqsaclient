/* eslint-disable react/prop-types */

export default function SectionBox(props) {
  const { boxTitle, bodyTitle, bodyInfo } = props
  return (
    <div className="box">
      <h4 className='box-title'>{boxTitle}</h4>
      <div className='box-body  text-center'>
        <h5>{bodyTitle}</h5>
        <span>{bodyInfo}</span>
      </div>
    </div>
  )
}
