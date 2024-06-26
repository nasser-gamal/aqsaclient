import Container from '../../layout/Container/Container';

import Users from "../../components/Users/Users"
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

