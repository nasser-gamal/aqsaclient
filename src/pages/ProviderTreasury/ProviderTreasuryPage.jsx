import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/ProviderTreasury/Index';

export default function ProviderTreasuryPage() {
  return (
    <>
      <PageHelmet title={'أرصدة المزودين'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
