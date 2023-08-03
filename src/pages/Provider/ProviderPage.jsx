import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/Provider/Index';

export default function ProviderPage() {
  return (
    <>
      <PageHelmet title={'المزودين'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
