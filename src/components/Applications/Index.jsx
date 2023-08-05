import Apps from "./apps";

import './apps.modules.css';

export default function Index() {
  return (
    <div>
      <div className="text-center app-text" >
        <span>هام جدا جدا
        </span>
        <p>
          هذا الرابط الرسمي الوحيد لتنزيل كافة تطبيقات .الاقصي
          لا تقم بتحميل اي تطبيق من اي رابط آخر مهما كان درجة ثقتك بصاحب الرابط او الصفحة او الجروب الذي به الرابط
          .الاقصي لن تقوم مطلقا بتنزيل تحديث للتطبيق علي اي رابط خارج موقعها الرسمي  
        </p>
      </div>
      <Apps />
    </div>
  )
}
