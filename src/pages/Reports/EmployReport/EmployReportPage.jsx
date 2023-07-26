import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import Employ from "../../../components/Reports/Employ/Index";
import Container from "../../../layout/Container/Container";

export default function EmployReportPage() {
  return (
    <>
      <PageHelmet title={'تقارير موظف'} />
      <Container>
        <Employ />
      </Container>
    </>

  )
}
