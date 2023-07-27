import Container from '../../../layout/Container/Container'

import PageHelmet from '../../../components/PageHelmet/PageHelmet'
import Index from '../../../components/Reports/feesReport/Index'

export default function FeesReportPage() {
  return (
    <>
      <PageHelmet title={'تقارير مصاريف'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}
