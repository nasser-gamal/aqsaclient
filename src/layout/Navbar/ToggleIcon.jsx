import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../../app/features/sidebar/sidebarSlice';
import { Burger } from '@mantine/core';

export default function ToggleIcon() {
  const { isOpen } = useSelector(state => state.sidebar)

  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleSideBar())
  }

  return (
    <div className='toggle-icon d-flex' >
      {/* <RxHamburgerMenu onClick={handleToggle} /> */}
      <Burger color={'white'} opened={!isOpen} onClick={handleToggle} aria-label="Toggle navigation" />
    </div>
  )
}
