import Container from '../../layout/Container/Container';

import Agents from "../../components/Users/Agents"
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