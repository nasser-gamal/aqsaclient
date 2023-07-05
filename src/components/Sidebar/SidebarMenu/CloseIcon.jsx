import { GrClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { toggleSideBar } from '../../../app/features/sidebar/sidebarSlice';

export default function CloseIcon() {

  const dispatch = useDispatch()


  return (
    <div className='close-icon d-flex flex-center'>
      <GrClose onClick={() => dispatch(toggleSideBar())} />
    </div>
  )
}
