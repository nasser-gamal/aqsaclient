import Container from '../../../layout/Container/Container'

import Day from '../../../components/Reports/DayReport/Index'
import PageHelmet from '../../../components/PageHelmet/PageHelmet'

export default function DayReportPage() {
  return (
    <>
      <PageHelmet title={'تقارير يومية'} />
      <Container>
        <Day />
      </Container>
    </>
  )
}
