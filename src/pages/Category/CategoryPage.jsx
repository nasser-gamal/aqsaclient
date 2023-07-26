import Container from '../../layout/Container/Container';
import Category from '../../components/Category';
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function CategoryPage() {
  return (
    <>
      <PageHelmet title={'الخدمات'} />
      <Container>
        <Category />
      </Container>
    </>

  )
}


