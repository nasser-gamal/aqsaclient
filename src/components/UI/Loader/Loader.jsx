
import Portal from '../../../utils/Portal';
import './loader.modules.css';
import logo from '../../../assets/logo/logo.png'

export default function Loader() {
  return (
    <Portal>
      {/* <div className="loader">
        <div className='prog'>
        </div>
      </div> */}
      <div className="loader">
        <div className="loader-info">
          <img style={{ height: "80px", marginLeft: "5px" }} src={logo} alt="logo" />
        </div>
      </div>
    </Portal>
  )
}
