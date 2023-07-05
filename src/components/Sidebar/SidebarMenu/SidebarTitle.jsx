import PropTypes from 'prop-types'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'

export default function SidebarTitle(props) {
  const { imgSrc, title, active, ...otherProps } = props;


  return (
    <div className="side-title d-flex flex-between" {...otherProps} >
      <div className="side-title-info d-flex flex-center">
        <img src={imgSrc} alt="" />
        <span>{title}</span>
      </div>
      <span
        className={`${active ? "svg-left d-flex icon rotate" : "svg-left d-flex icon"}`}>
        <MdOutlineKeyboardArrowLeft />
      </span>
    </div>
  )
}


SidebarTitle.propTypes = {
  icon: PropTypes.string,
  imgSrc: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
}