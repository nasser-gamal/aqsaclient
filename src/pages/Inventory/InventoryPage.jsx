import Container from '../../layout/Container/Container';
import Index from "../../components/Inventory/Index";
import PageHelmet from '../../components/PageHelmet/PageHelmet';

export default function InventoryPage() {


  return (
    <>
      <PageHelmet title={'الجرد'} />
      <Container>
        <Index />
      </Container>
    </>
  )
}

