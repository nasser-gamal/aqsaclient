import PageHelmet from '../../../components/PageHelmet/PageHelmet'
import Transfer from '../../../components/Transaction/Transfer/Index'
import Container from '../../../layout/Container/Container'

export default function TransferPage() {
  return (
    <>
      <PageHelmet title={'التسوية'} />
      <Container>
        <Transfer />
      </Container>
    </>
  )
}
