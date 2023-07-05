import CustomButton from '../../common/Button/CustomButton'
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { openModal } from '../../../app/features/modal/modalSlice';

export default function EditButton({ editProps }) {

  const dispatch = useDispatch()

  return (
    <CustomButton
      type='button'
      classes={'edit-btn'}
      width={'60px'}
      height={'30px'}
      fontSize={'17px'}
      onClick={
        () =>
          dispatch(openModal(editProps))}
    >
      تعديل
    </CustomButton>
  )
}




EditButton.propTypes = {
  editProps: PropTypes.object.isRequired,
}