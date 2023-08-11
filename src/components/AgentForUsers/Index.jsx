import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import AgentBox from './agentBox/AgentBox';
import { useFindAllAgentsQuery } from '../../app/features/user/agentApi';
import Logo from '../../assets/logo/Logo_2.png'

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
          هذا الرابط الرسمي الوحيد للتواصل مع الوكلاء والكوليكتور لتبادل الارصده بينهم وبين التجار .الاقصي لا تدخل اي رابط آخر مهما كان درجة ثقتك بصاحب الرابط او الصفحة او الجروب الذي به الرابط .الاقصي لن تقوم مطلقا بتنزيل بيانات الوكلاء والكوليكتور علي اي رابط خارج موقعها الرسمي
        </p>
        <div className='text-center aqsa-info'>
          <span style={{display: "block"}}>خدمة العملاء : 01210333323</span>
          <span style={{display: "block"}}>رابط قناة التليجرام : <a href="https://t.me/aqsapay">https://t.me/aqsapay</a></span>
          <span style={{display: "block"}}>رابط قناة الواتساب : 
            <a href="https://whatsapp.com/channel/0029Va1JyZz6mYPKT4SLlZ0x">
              https://whatsapp.com/channel/0029Va1JyZz6mYPKT4SLlZ0x
            </a>
            </span>
        </div>
      </div>
      <div className='text-center' style={{
        marginTop: '20px'
      }}>
        <h1 style={{fontWeight: 'normal'}}> 
        وكلاء وكوليكتور الاقصى المعتمدين
        </h1>
      </div>
      <AgentBox agents={data?.users} />
    </>
  )
}
