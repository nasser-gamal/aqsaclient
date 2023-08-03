import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/AddionalTreasury/Index';

export default function AddionalTreasuryPage() {
  return (
    <>
      <PageHelmet title={'أرصدة أخري'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
