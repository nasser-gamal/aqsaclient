import PageHelmet from "../../../components/PageHelmet/PageHelmet";
import Index from "../../../components/Reports/BankAccount/Index";
import Container from "../../../layout/Container/Container";

export default function BankAccountReportPage() {
  return (
    <>
      <PageHelmet title={'تقارير الحسابات'} />
      <Container>
        <Index />
      </Container>
    </>

  )
}
