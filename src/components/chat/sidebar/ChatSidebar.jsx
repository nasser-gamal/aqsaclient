/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../../layout/Navbar/Logo'
import './sidebar.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { openModal } from '../../../app/features/modal/modalSlice'
import groupImage from '../../../assets/teamwork.png'

export default function ChatSidebar({ setOpenChat, chats }) {
  const { user } = useSelector(state => state.user)
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
        {
          chats?.map(chat => {
            return <li key={chat.id} onClick={() => setOpenChat(true)}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img style={{ width: '40px' }} src={chat.avatar || groupImage} alt="groupImg" />
                <h5>
                  {chat.name}
                </h5>
              </div>
              <p style={{
                whiteSpace: 'nowrap',
              }}>
                {/* {chat.lastMessageSent || user.id == chat?.owner.id ? "تم إنشاء المجموعة" : "تم اضافتك للمجموعة"} */}
                {chat.lastMessageSent}
              </p>
            </li>
          })
        }

      </ul>
    </div>
  )
}
