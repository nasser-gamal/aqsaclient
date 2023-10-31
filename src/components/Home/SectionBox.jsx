/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import { openModal } from "../../app/features/modal/modalSlice";

export default function SectionBox({ boxTitle, img, info, active, click }) {
  const dispatch = useDispatch();


  return (
    <div className={active ? "box" : "box disabled"} onClick={() => {
      if (info) {
        dispatch(openModal({ ...info }))
      } else {
        click()
      }
    }}>
      <div className='box-body  text-center'>
        <img src={img} alt={img} />
        <h4 className='box-title'>{boxTitle}</h4>
      </div>
    </div>
  )
}
