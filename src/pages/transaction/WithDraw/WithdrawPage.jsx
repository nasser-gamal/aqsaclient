import Container from '../../../layout/Container/Container';
import WithDraw from '../../../components/Transaction/WithDraw/Index';
import PageHelmet from '../../../components/PageHelmet/PageHelmet';


export default function WithdrawPage() {
  return (
    <>
      <PageHelmet title={'السحب'} />
      <Container>
        <WithDraw />
      </Container>
    </>
  )
}
