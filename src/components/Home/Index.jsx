import { useEffect } from 'react';
import { useFindTreasuryQuery } from '../../app/features/treasury/treasuryApi';
import './home.modules.css';

import Section from './Section';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';

export default function Index() {
  const dispatch = useDispatch();
  const { data: treasury, isLoading } = useFindTreasuryQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading])

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
            bodyInfo: treasury?.amountTotal
          },
        ]
      } />
    </div>
  )
}


