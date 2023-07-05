import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

export default function Container({ children }) {

  const { isOpen } = useSelector(state => state.sidebar)

  return (
    <div className={isOpen ? "aqsa full" : "aqsa half"}>
      {children}
    </div>
  )
}




Container.propTypes = {
  children: PropTypes.object,
}