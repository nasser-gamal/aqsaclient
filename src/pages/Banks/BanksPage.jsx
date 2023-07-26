import Bank from '../../components/Banks/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Container from '../../layout/Container/Container';

export default function BankPage() {
  return (
    <>
      <PageHelmet title={'البنوك'} />
      <Container>
        <Bank />
      </Container>
    </>

  )
}


