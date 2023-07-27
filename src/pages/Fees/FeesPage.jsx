import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/Fees/Index';

export default function FeesPage() {


  return (
    <>
      <PageHelmet title={'مصاريف'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}

