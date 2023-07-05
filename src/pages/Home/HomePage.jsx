import Container from '../../layout/Container/Container';
import Home from "../../components/Home/Index";
import { useSelector } from 'react-redux';

export default function HomePage() {

  const user = useSelector(state => state.user);

  console.log('user', user)
  return (
    <Container>
      <Home />
    </Container>
  )
}

