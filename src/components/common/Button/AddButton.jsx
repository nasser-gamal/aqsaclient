/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

import CustomButton from "../../common/Button/CustomButton";

import { openModal } from "../../../app/features/modal/modalSlice";

export default function AddButton({ name, modalTitle, childrenProps }) {

  const dispatch = useDispatch()

  return (
    <div className='add-new-btn'>
      <CustomButton
        classes={'add-btn'}
        width={'80px'}
        height={'35px'}
        fontSize={'18px'}
        onClick={() => dispatch(openModal({ name, modalTitle, status: 'حفظ', childrenProps }))}>
        إضافة
      </CustomButton>
    </div>
  )
}
