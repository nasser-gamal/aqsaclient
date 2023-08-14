import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/Dues/Index';

export default function DuesPage() {
  return (
    <>
      <PageHelmet title={'مستحقات'} />
      <Container>
        <Index />
      </Container>
    </>
  );
}
