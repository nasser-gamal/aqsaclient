import Commission from '../../components/CommissionPage/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Container from '../../layout/Container/Container';

export default function CommissionPage() {
  return (
    <>
      <PageHelmet title={'العمولة'} />
      <Container>
        <Commission />
      </Container>
    </>
  )
}
