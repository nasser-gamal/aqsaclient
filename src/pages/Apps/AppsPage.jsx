import Index from '../../components/Apps/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Container from '../../layout/Container/Container';

export default function AppsPage() {
  return (
    <>
      <PageHelmet title={'التطبيقات'} />
      <Container>
        <Index />
      </Container>
    </>

  )
}


