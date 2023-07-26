import Container from '../../../layout/Container/Container';
import Deposit from '../../../components/Transaction/Deposit/Index';
import PageHelmet from '../../../components/PageHelmet/PageHelmet';


export default function DepositPage() {
  return (
    <>
      <PageHelmet title={'الايداع'} />
      <Container>
        <Deposit />
      </Container>
    </>
  )
}
