
import { useSelector } from 'react-redux'
import SidebarMenu from './SidebarMenu/SidebarMenu'
import './sidebar.modules.css'
import CloseIcon from './SidebarMenu/CloseIcon'


export default function Sidebar() {
  const { isOpen } = useSelector(state => state.sidebar)


  return (
    <div className={isOpen ? 'aqsa-side-bar show' : 'aqsa-side-bar'}>
      <CloseIcon />
      <SidebarMenu />
    </div>
  )
}
