/* eslint-disable react/prop-types */
import AgentCommissisonTable from './AgentComTable';
import AgentInfoTable from './AgentInfoTable';

import Spinner from '../../../UI/Loader/Spinner'

import './index.modules.css';

export default function CommissionTable({ data, user, isLoading, isFetching }) {


  if (isLoading || isFetching) {
    return <Spinner />
  }


  return (
    <>
      {data && data?.commissions.length > 0 &&
        <div className='commission-tables'>
          <AgentInfoTable user={user} />
          <AgentCommissisonTable data={data} />
        </div>
      }
      {
        data?.commissions.length < 1 && <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
            fontSize: '19px'
          }}
        >
          <span>لا يوجد عمولة</span>
        </div >
      }
    </>
  )
}
