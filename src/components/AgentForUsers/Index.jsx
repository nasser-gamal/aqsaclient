import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentBox from './agentBox/AgentBox';
import { useFindAllAgentsQuery } from '../../app/features/user/agentApi';
import Logo from '../../assets/logo/Logo_2.png';
import whatsApp from '../../assets/icons/whatsapp.png';
import telegram from '../../assets/icons/telegram.png';

import './index.modules.css';

export default function Index() {

  const { data, isLoading } = useFindAllAgentsQuery({ page: "", limit: "", order: 'createdAt', sort: 'ASC' });
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);

  return (
    <>
      <div className='agent-logo'>
        <img src={Logo} alt={Logo} />
      </div>
      <div className='agent-text'>
        <p>
          هام جدا جدا
          هذا الرابط الرسمي الوحيد للتواصل مع الوكلاء والكوليكتور لتبادل الارصده بينهم وبين التجار . لا تدخل اي رابط آخر مهما كان درجة ثقتك بصاحب الرابط او الصفحة او الجروب الذي به الرابط .الاقصي لن تقوم مطلقا بتنزيل بيانات الوكلاء والكوليكتور علي اي رابط خارج موقعها الرسمي
        </p>
        <div className='text-center aqsa-info'>
          <div className='d-flex flex-center' style={{
            gap: '30px',
            padding: '15px 0',
            flexWrap: 'wrap'
          }}>
            <span style={{display: 'block'}}>رقم خدمة العملاء
              <a href='tel:01210333323' style={{ display: 'flex',justifyContent: 'center',  marign: 'auto', textAlign: 'center' }}>
                01210333323
              </a>
            </span>
            <span style={{display: 'block'}}>
              التواصل عبر التليجرام
              <a href="https://t.me/aqsapay"  style={{display: 'flex',justifyContent: 'center',  marign: 'auto', textAlign: 'center' }}>
                <img
                  style={{
                    height: '40px',
                    objectFit: 'contain',
                  }}
                  src={telegram} alt={telegram} />
              </a>
            </span>
            <span style={{display: 'block'}}>
               التواصل عبر الواتس
              <a href="https://whatsapp.com/channel/0029Va1JyZz6mYPKT4SLlZ0x"  style={{display: 'flex',justifyContent: 'center',  marign: 'auto', textAlign: 'center' }}>
                <img style={{
                  height: '40px',
                  objectFit: 'contain',
                }}
                  src={whatsApp} alt={whatsApp} />
              </a>
            </span>
          </div>
        </div>
      </div >
      <div className='text-center' style={{
        marginTop: '20px'
      }}>
        <h1 style={{ fontWeight: 'normal' }}>
          وكلاء وكوليكتور الاقصى المعتمدين
        </h1>
      </div>
      <AgentBox agents={data?.users} />
    </>
  )
}
