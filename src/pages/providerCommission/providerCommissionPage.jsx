import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/ProviderCommission/Index';

export default function ProviderCommissionPage() {
  return (
    <>
      <PageHelmet title={'عمولة المزودين'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
