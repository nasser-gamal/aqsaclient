import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { changeLimit } from "../../../app/features/filter/filterSlice";

import './entry.modules.css';

export default function EntrySelect() {

  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { page, orderBy, sort } = useSelector(
    (state) => state.filter
  );

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(changeLimit(value));
    navigate(
      `${pathname}?page=${page}&limit=${value}&orderBy=${orderBy}&sort=${sort}`
    );
  };


  return (
    <div className="entry">
      <select onChange={(e) => handleChange(e)}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="70">70</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}
