import Container from '../../layout/Container/Container';

import Agents from "../../components/Agents/Index"
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function AgentsPage() {

  return (
    <>
      <PageHelmet title={'الوكلاء'} />
      <Container>
        <Agents />
      </Container>
    </>
  )
}