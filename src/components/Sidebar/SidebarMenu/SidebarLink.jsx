/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

export default function SidebarLink({ url, imgSrc, title }) {

  return (
    <NavLink to={url}>
      <img src={imgSrc} alt="No Found" />
      <span> {title}</span>
    </NavLink>
  )
}
