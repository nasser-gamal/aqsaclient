import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/AgentTreasury/Index';

export default function AgentTreasuryPage() {
  return (
    <>
      <PageHelmet title={'خزنة التجار'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
