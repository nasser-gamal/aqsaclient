import ChatSidebar from '../../components/chat/sidebar/ChatSidebar';
import ChatContainer from '../../components/chat/ChatContainer';
import ChatNav from '../../components/chat/Navbar/ChatNav';
import ChatContent from '../../components/chat/content/ChatContent';
import { useState } from 'react';
import NewMessage from '../../components/chat/NewMessage/NewMessage';

export default function Chat() {

  const [openChat, setOpenChat] = useState(false)


  return (
    <div className='chat-page'>
      <ChatNav
        openChat={openChat}
      />
      <ChatSidebar
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
