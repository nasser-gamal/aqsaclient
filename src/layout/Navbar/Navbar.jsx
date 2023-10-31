import { NavLink } from "react-router-dom";
import './nav.modules.css'

import Logo from "./Logo";


// import SearchInput from "./SearchInput";
import Profile from "./Profile";
import ToggleIcon from "./ToggleIcon";
import { useDispatch } from "react-redux";
import { toggleListMenu } from "../../app/features/sidebar/sidebarSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const handleCloseList = () => {
    dispatch(toggleListMenu({ listId: null }))
    localStorage.removeItem('showList')
  }

  return (
    <nav>
      <div className="d-flex flex-between">
        <NavLink to='/' onClick={handleCloseList}>
          <Logo />
        </NavLink>
        {/* <SearchInput /> */}
        <Profile />
        <ToggleIcon />
      </div>
    </nav>
  )
}
