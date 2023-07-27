import Container from '../../../layout/Container/Container'

import PageHelmet from '../../../components/PageHelmet/PageHelmet'
import Index from '../../../components/Reports/CommissionsReports/Index'

export default function CommissionsReportsPage() {
  return (
    <>
      <PageHelmet title={'تقارير عمولة'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}
