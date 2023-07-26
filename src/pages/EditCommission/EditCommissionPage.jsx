import EditCommission from '../../components/EditCommission/Index'
import PageHelmet from '../../components/PageHelmet/PageHelmet'
import Container from '../../layout/Container/Container'

export default function EditCommissionPage() {
  return (
    <>
      <PageHelmet title={'تعديل العمولة'} />
      <Container>
        <EditCommission />
      </Container>
    </>
  )
}
