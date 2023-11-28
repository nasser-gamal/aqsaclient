/* eslint-disable react/prop-types */
import './chatContent.css'
import logo from '../../../assets/logo/Logo_2.png'

export default function ChatContent({ openChat }) {
  return (
    <>
      {
        openChat ? <ul className='chat-content'>
          <li className='right'>
            <h5>
              Ahmed Mohamed
            </h5>
            <p>
              السلام عليكم ورحمة الله وبركاته
            </p>
          </li>
          <li className='left'>
            <h5>
              Ahmed Mohamed
            </h5>
            <p>
              وعليكم السلام ورحمة الله وبركاته
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
          <li className='left'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem vel eum quasi maiores consectetur ipsam. Explicabo, fugiat omnis. Quod laborum aliquam nihil tempore autem minus saepe aspernatur totam dicta voluptatibus.
            </p>
          </li>
        </ul> 
        
          : <div style={{
          textAlign: 'center'
        }}>
          <img src={logo} alt="" />
        </div>
      }
    </>
  )
}
