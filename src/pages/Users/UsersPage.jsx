import Container from '../../layout/Container/Container';

import Users from "../../components/Users/Index"
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function UsersPage() {

  return (
    <>
      <PageHelmet title={'المستخدمين'} />
      <Container>
        <Users />
      </Container>
    </>
  )
}

