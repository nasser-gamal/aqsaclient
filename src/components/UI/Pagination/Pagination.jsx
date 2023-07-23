/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { navigatePage } from "../../../app/features/filter/filterSlice";

import './pagination.modules.css';
export default function Pagination({ pagination }) {

  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const { limit, orderBy, sort } = useSelector(state => state.filter);

  const handleNavigate = (value) => {
    dispatch(navigatePage(value));
  };

  const query = `&limit=${limit}&orderBy=${orderBy}&sort=${sort}`

  return (
    <div className="page-info mt-3">
      <div className="entry-info">
        {/* <span>
          عرض {pagination?.pageNumber}   {pagination?.itemPerPage}  من 
          <span className="total-items"> {pagination?.totalItems}</span>
        </span> */}
      </div>
      <div className="pagena">
        <div className="pagination">
          <Link
            onClick={() => handleNavigate(pagination?.previousPage)}
            to={`${path}?page=${pagination?.previousPage}${query}`}
            className={
              "page-link previous"
            }
          >
            السابق
          </Link>
          {pagination?.currentPage !== 1 && pagination?.previousPage !== 1 && (
            <Link
              onClick={() => handleNavigate(1)}
              to={`${path}?page=1${query}`}
              className="page-link link"
            >
              1
            </Link>
          )}
          {pagination?.hasPreviousPage && (
            <Link
              onClick={() => handleNavigate(pagination?.previousPage)}
              to={`${path}?page=${pagination?.previousPage}${query}`}
              className="page-link link"
            >
              {pagination?.previousPage}
            </Link>
          )}
          <Link
            onClick={() => handleNavigate(pagination?.currentPage)}
            to={`${path}?page=${pagination?.currentPage}${query}`}
            className="page-link active link"
          >
            {pagination?.currentPage}
          </Link>
          {pagination?.hasNextPage && (
            <Link
              onClick={() => handleNavigate(pagination?.nextPage)}
              to={`${path}?page=${pagination?.nextPage}${query}`}
              className="page-link link"
            >
              {pagination?.nextPage}
            </Link>
          )}
          {pagination?.hasNextTwoPage && (
            <Link
              onClick={() => handleNavigate(pagination?.nextTwoPage)}
              to={`${path}?page=${pagination?.nextTwoPage}${query}`}
              className="page-link link"
            >
              {pagination?.nextTwoPage}
            </Link>
          )}
          {pagination?.hasNextThreePage && (
            <Link
              onClick={() => handleNavigate(pagination?.nextThreePage)}
              to={`${path}?page=${pagination?.nextThreePage}${query}`}
              className="page-link link"
            >
              {pagination?.nextThreePage}
            </Link>
          )}
          <Link
            onClick={() => handleNavigate(pagination.nextPage)}
            to={`${path}?page=${pagination.nextPage}${query}`}
            className={
              !pagination.hasNextPage ? "page-link next disabled" : "page-link next"
            }
          >
            التالي
          </Link>
        </div>
      </div>
    </div>
  );
}

