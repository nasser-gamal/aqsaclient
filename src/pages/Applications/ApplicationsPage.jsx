import Index from "../../components/Applications/Index";
import PageHelmet from '../../components/PageHelmet/PageHelmet';


export default function ApplicationsPage() {
  return (
    <>
      <PageHelmet title={'تطبيقات الاقصي'} />
      <div style={{
        padding: '0 50px 30px',
      }}>
        <Index />
      </div>
    </>
  )
}
