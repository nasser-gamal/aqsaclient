/* eslint-disable react/prop-types */
import CustomButton from '../../common/Button/CustomButton'

import { useDispatch } from 'react-redux';
import { openModal } from '../../../app/features/modal/modalSlice';

export default function DeleteButton({ deleteProps }) {

  const dispatch = useDispatch()

  return (
    <CustomButton
      type='button'
      classes={'delete-btn'}
      width={'60px'}
      height={'30px'}
      fontSize={'17px'}
      onClick={
        () =>
          dispatch(openModal(deleteProps))}
    >
      حئف
    </CustomButton>
  )
}



