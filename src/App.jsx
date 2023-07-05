import './App.css'
import { useSelector } from 'react-redux';

import Navbar from './layout/Navbar/Navbar';

import Router from "./routes/Routes";

import OverLayBg from './components/overlay/OverLayBg';
import Sidebar from './components/Sidebar/Sidebar';
import ResponseMsg from './components/UI/ResponseMsg/ResponseMsg';
import ModalManager from './components/common/Modal/ModalManager';
import Loader from './components/UI/Loader/Loader';


function App() {
  const { isLoading } = useSelector(state => state.loader);



  return (
    <>
      {isLoading && <Loader />}
      <ResponseMsg />
      {/* <OverLayBg /> */}
      <ModalManager />
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Router />
    </>
  )
}

export default App
