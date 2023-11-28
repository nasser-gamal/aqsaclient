import Container from '../../layout/Container/Container';
import Home from "../../components/Home/Index";
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function HomePage() {


  return (
    <>
      <PageHelmet title={'الاقصي للدفع الالكتروني'} />
      <Container>
        <Home />
      </Container>
    </>
  )
}


