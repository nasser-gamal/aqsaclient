/* eslint-disable react/prop-types */
import logo from '../../../assets/logo/Logo_2.png';
import whatsApp from '../../../assets/icons/whatsapp.png';
import telegram from '../../../assets/icons/telegram.png';
import phone from '../../../assets/icons/telephone.png';


export default function AgentBox({ agents }) {
  return (
    <div className="agent-boxes">
      {
        agents?.map(agent => {
          return <div className="agent-box" key={agent.id}>
            <img src={logo} alt={logo} />
            <div >
              <span>اسم الوكيل </span>
              <span>{agent.userName}</span>
            </div>
            <div >
              <span>العنوان </span>
              <span>{agent.address}</span>
            </div>
            <div
              style={{ marginTop: '10px' }}>
              <span style={{ display: 'block' }}>بيانات التواصل </span>
              <div className='d-flex' style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
                gap: '25px'
              }}>
                <a href={`tel:${agent.phoneNumber}`} style={{ display: 'block', width: 'fit-content' }}>
                  <img style={{
                    height: '30px',
                    objectFit: 'contain'
                  }} src={phone} alt={phone} />
                </a>
                <a href={`https://api.whatsapp.com/send?phone=+20${agent.phoneNumber}&text=ارسل رسالة مباشرة للوكيل`}
                  target="_blank"
                  style={{ display: 'block', width: 'fit-content' }} rel="noreferrer">
                  <img style={{
                    height: '30px',
                    objectFit: 'contain'
                  }} src={whatsApp} alt={whatsApp} />
                </a>
                <a href={`https://t.me/+20${agent.phoneNumber}`}
                  target="_blank"
                  style={{ display: 'block', width: 'fit-content' }}
                   rel="noreferrer">
                  <img style={{
                    height: '30px',
                    objectFit: 'contain'
                  }} src={telegram} alt={telegram} />
                </a>
              </div>
            </div>
          </div>
        })
      }
    </div>
  )
}
