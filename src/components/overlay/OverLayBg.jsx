
import { useSelector } from 'react-redux'
import './overLay.modules.css'
import Portal from '../../utils/Portal'

export default function OverLayBg() {
  const { isOpen } = useSelector(state => state.sidebar)

  return (
    <Portal>
      {isOpen && <div className='overlay'>
      </div>
      }
    </Portal>
  )
}
