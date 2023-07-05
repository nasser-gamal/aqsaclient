import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { toggleSideBar } from '../../app/features/sidebar/sidebarSlice';

export default function ToggleIcon() {

  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleSideBar())
  }

  return (
    <div className='toggle-icon d-flex' >
      <RxHamburgerMenu onClick={handleToggle} />
    </div>
  )
}
