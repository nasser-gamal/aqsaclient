import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SidebarLink({ url, imgSrc, title }) {

  return (
    <NavLink to={url}>
      <img src={imgSrc} alt="No Found" />
      <span> {title}</span>
    </NavLink>
  )
}

SidebarLink.propTypes = {
  url: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  title: PropTypes.string.isRequired,
}