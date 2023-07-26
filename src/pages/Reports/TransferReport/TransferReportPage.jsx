import PageHelmet from '../../../components/PageHelmet/PageHelmet';
import Index from '../../../components/Reports/Transfer/Index';
import Container from '../../../layout/Container/Container';

export default function TransferReportPage() {

  return (
    <>
      <PageHelmet title={'تقارير تسوية حسابات'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}

