import Container from '../../layout/Container/Container';
import Segment from '../../components/Segment/Index';
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function SegmentPage() {
  return (
    <>
      <PageHelmet title={'الشرائح'} />
      <Container>
        <Segment />
      </Container>
    </>
  )
}
