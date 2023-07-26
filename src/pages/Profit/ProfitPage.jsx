import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/profit/Index';
import Container from '../../layout/Container/Container';

export default function ProfitPage() {
  return (
    <>
      <PageHelmet title={'الارباح'} />
      <Container>
        <Index />
      </Container>
    </>

  )
}
