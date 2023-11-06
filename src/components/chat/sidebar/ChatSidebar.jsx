/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import Logo from '../../../layout/Navbar/Logo'
import './sidebar.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { openModal } from '../../../app/features/modal/modalSlice'

export default function ChatSidebar({ setOpenChat }) {

  const dispatch = useDispatch()

  return (
    <div className='side-bar'>
      <div className='side-bar-head' >
        <Logo />
        {/* <button className='new-group-btn'
          type='button'
          onClick={() => dispatch(openModal({
            name: "AddNewGroup",
            modalTitle: 'انشاء جروب محادثة',
            status: 'انشاء',
            childrenProps: { width: '400px' }
          }))}
        >
          <AiOutlinePlus />
          اضافة جروب جديد
        </button> */}
      </div>
      <div>
        <button className='new-group-btn'
          type='button'
          onClick={() => dispatch(openModal({
            name: "AddNewGroup",
            modalTitle: 'انشاء جروب محادثة',
            status: 'انشاء',
            childrenProps: { width: '400px' }
          }))}
        >
          <AiOutlinePlus />
          اضافة جروب جديد
        </button>
      </div>
      <ul className='groups'>
        <li onClick={() => setOpenChat(true)}>
          جروب س
          <p>
            رسالة بس
          </p>
        </li>
        <li onClick={() => setOpenChat(true)}>
          جروب س
          <p>
            رسالة بس
          </p>
        </li>
        <li onClick={() => setOpenChat(true)}>
          جروب س
          <p>
            رسالة بس
          </p>
        </li>
        <li onClick={() => setOpenChat(true)}>
          جروب س
          <p>
            رسالة بس
          </p>
        </li>
        <li onClick={() => setOpenChat(true)}>
          جروب س
          <p>
            رسالة بس
          </p>
        </li>
      </ul>
    </div>
  )
}
