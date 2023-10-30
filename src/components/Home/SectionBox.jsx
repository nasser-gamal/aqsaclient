/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux"
import { openModal } from "../../app/features/modal/modalSlice";

export default function SectionBox({ boxTitle, img, info, active }) {
  const dispatch = useDispatch();


  return (
    <div className={active ? "box" : "box disabled"} onClick={() => {
      dispatch(openModal({
        ...info
      }))
    }}>
      <div className='box-body  text-center'>
        <img src={img} alt={img} />
        <h4 className='box-title'>{boxTitle}</h4>
      </div>
    </div>
  )
}
