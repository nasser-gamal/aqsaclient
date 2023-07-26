import './App.css'
import { useSelector } from 'react-redux';

import Router from "./routes/Routes";

import ResponseMsg from './components/UI/ResponseMsg/ResponseMsg';
import ModalManager from './components/common/Modal/ModalManager';
import Loader from './components/UI/Loader/Loader';


function App() {
  const { isLoading } = useSelector(state => state.loader);


  return (
    <>
      {isLoading && <Loader />}
      <ResponseMsg />
      <ModalManager />
      <Router />
    </>
  )
}

export default App
