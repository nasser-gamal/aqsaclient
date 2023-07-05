
import './form-btns.modules.css';
import CustomButton from '../../common/Button/CustomButton';


import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../app/features/modal/modalSlice';

export default function FormButtons() {

  const dispatch = useDispatch();

  const { status } = useSelector(state => state.modal);


  return (
    <div className='d-flex flex-center form-btns'>
      <CustomButton
        type='submit'
        classes={'add-btn'}
        width={'80px'}
        height={'30px'}
        fontSize={'18px'}
      >
        {status}
      </CustomButton>
      <CustomButton
        type='button'
        classes={'cancel-btn'}
        width={'80px'}
        height={'30px'}
        fontSize={'18px'}
        onClick={() => dispatch(closeModal())}
      >
        إلغاء
      </CustomButton>
    </div>
  )
}
