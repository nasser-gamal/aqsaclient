import Container from '../../layout/Container/Container';
import BankAccount from '../../components/BankAccounts/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function BankAccountsPage() {
  return (
    <>
      <PageHelmet title={'الحسابات'} />
      <Container>
        <BankAccount />
      </Container>
    </>
  )
}
