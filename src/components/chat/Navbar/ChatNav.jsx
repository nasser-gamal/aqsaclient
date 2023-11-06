/* eslint-disable react/prop-types */
import './chatNav.css'

export default function ChatNav({ openChat }) {
  return (
    <>
      {
        openChat ? <div className='chat-nav'>
          <div className='chat-name' >
            <h4>
              محمد احمد
            </h4>
          </div >
        </div > : <></>
      }
    </>

  )
}
