
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/AgentForUsers/Index';

export default function AgentForUsersPage() {

  return (
    <>
      <PageHelmet title={'الوكلاء'} />
      <div style={{
        padding: '0 50px 30px',
      }}>
        <Index />
      </div>
    </>
  )
}