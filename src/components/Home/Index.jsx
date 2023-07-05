import './home.modules.css';

import Section from './Section';

export default function Index() {
  return (
    <div>
      <Section title={'الحسابات'} boxes={
        [
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'البنك الاهلي',
            bodyTitle: 'الرصيد الحالي',
            bodyInfo: '1200'
          },
        ]
      } />
      <Section title={'الموظفين'} boxes={
        [
          {
            boxTitle: 'احمد جمعة',
            bodyTitle: 'عدد العمليات',
            bodyInfo: '1200'
          },
          {
            boxTitle: 'عمر جمعة',
            bodyTitle: 'عدد العمليات',
            bodyInfo: '1200'
          },
        ]
      } />
      <Section title={'الخزينة'} boxes={
        [
          {
            boxTitle: 'الخزينة',
            bodyTitle: 'الارباح',
            bodyInfo: '1200'
          },
        ]
      } />
    </div>
  )
}


