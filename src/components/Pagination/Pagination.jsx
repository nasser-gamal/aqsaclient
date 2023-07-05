import { Link } from "react-router-dom";

import './pagination.modules.css';

export default function Pagination() {
  // export default function Pagenation({ pagenation }) {
  // const filter = useSelector(state => state.filterRecords)
  // const dispatch = useDispatch()

  // const {
  //   page: pageNumber,
  //   itemPerPage,
  //   totalItems,
  //   currentPage,
  //   hasNextPage,
  //   hasNextThreePage,
  //   hasNextTwoPage,
  //   hasPreviousPage,
  //   nextPage,
  //   nextThreePage,
  //   nextTwoPage,
  //   previousPage,
  // } = pagenation;



  return (
    <div className="page-info mt-3">
      <div className="entry-info">
        <span>
          عرض 10 من 100
          <span className="total-items">100</span>
        </span>
      </div>
      <div className="pagena">
        <div className="pagination">
          <Link
            // onClick={() => handleNavigate(previousPage)}
            // to={`${path}?page=${previousPage}${query}`}
            className={
              "page-link previous"
            }
          >
            السابق
          </Link>
          <Link
            // onClick={() => handleNavigate(previousPage)}
            // to={`${path}?page=${previousPage}${query}`}
            className={
              "page-link link"
            }
          >
            1
          </Link>
          <Link
            // onClick={() => handleNavigate(previousPage)}
            // to={`${path}?page=${previousPage}${query}`}
            className={
              "page-link link"
            }
          >
            2
          </Link>
          <Link
            // onClick={() => handleNavigate(previousPage)}
            // to={`${path}?page=${previousPage}${query}`}
            className={
              "page-link link"
            }
          >
            3
          </Link>
          <Link
            // onClick={() => handleNavigate(previousPage)}
            // to={`${path}?page=${previousPage}${query}`}
            className={
              "page-link next"
            }
          >
            التالي
          </Link>
          {/* {currentPage !== 1 && previousPage !== 1 && (
            <Link
              onClick={() => handleNavigate(1)}
              to={`${path}?page=1${query}`}
              className="page-link link"
            >
              1
            </Link>
          )} */}
          {/* {hasPreviousPage && (
            <Link
              onClick={() => handleNavigate(previousPage)}
              to={`${path}?page=${previousPage}${query}`}
              className="page-link link"
            >
              {previousPage}
            </Link>
          )} */}
          {/* <Link
            onClick={() => handleNavigate(currentPage)}
            to={`${path}?page=${currentPage}${query}`}
            className="page-link active link"
          >
            {currentPage}
          </Link> */}
          {/* {hasNextPage && (
            <Link
              onClick={() => handleNavigate(nextPage)}
              to={`${path}?page=${nextPage}${query}`}
              className="page-link link"
            >
              {nextPage}
            </Link>
          )} */}
          {/* {hasNextTwoPage && (
            <Link
              onClick={() => handleNavigate(nextTwoPage)}
              to={`${path}?page=${nextTwoPage}${query}`}
              className="page-link link"
            >
              {nextTwoPage}
            </Link>
          )} */}
          {/* {hasNextThreePage && (
            <Link
              onClick={() => handleNavigate(nextThreePage)}
              to={`${path}?page=${nextThreePage}${query}`}
              className="page-link link"
            >
              {nextThreePage}
            </Link>
          )} */}
          {/* <Link
            onClick={() => handleNavigate(nextPage)}
            to={`${path}?page=${nextPage}${query}`}
            className={
              !hasNextPage ? "page-link next disabled" : "page-link next"
            }
          >
            nextPage
          </Link> */}
        </div>
      </div>
    </div>
  );
}

