import ChatSidebar from '../../components/chat/sidebar/ChatSidebar';
import ChatContainer from '../../components/chat/ChatContainer';
import ChatNav from '../../components/chat/Navbar/ChatNav';
import ChatContent from '../../components/chat/content/ChatContent';
import { useEffect, useState } from 'react';
import NewMessage from '../../components/chat/NewMessage/NewMessage';
import axios from 'axios';

export default function Chat() {

  const [openChat, setOpenChat] = useState(false)
  const [chats, setChats] = useState()

  const getAllChats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        withCredentials: true,
      });
      setChats(response?.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAllChats()
  }, [])

  return (
    <div className='chat-page'>
      <ChatNav
        openChat={openChat}
      />
      <ChatSidebar
        chats={chats}
        setOpenChat={setOpenChat}
      />
      <ChatContainer>
        <ChatContent
          openChat={openChat}
        />
      </ChatContainer>
      {openChat && <NewMessage />}
    </div>
  )
}
