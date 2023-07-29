
import Portal from '../../../utils/Portal';
import './loader.modules.css';
import loader from '../../../assets/load.gif'

export default function Loader() {
  return (
    <Portal>
      <div className="loader">
        <div>
          {/* <img src={loader} alt={loader} /> */}
        </div>
      </div>
    </Portal>
  )
}
