import Container from '../../layout/Container/Container';
import PageHelmet from '../../components/PageHelmet/PageHelmet';
import Index from '../../components/SubCategory/Index';

export default function SubCategoryPage() {
  return (
    <>
      <PageHelmet title={'الخدمات الفرعية'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}


