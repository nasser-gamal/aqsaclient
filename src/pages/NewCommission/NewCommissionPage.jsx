import NewCommission from '../../components/NewCommission/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Container from '../../layout/Container/Container';

export default function NewCommissionPage() {
  return (
    <>
      <PageHelmet title={'عمولة جديدة'} />
      <Container>
        <NewCommission />
      </Container>
    </>
  )
}
