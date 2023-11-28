 /* eslint-disable react/prop-types */
 /* eslint-disable react/prop-types */

 import { useState } from 'react';
 import './table.modules.css';
 import { useDispatch, useSelector } from 'react-redux';
 import { sortData } from '../../../app/features/filter/filterSlice';
 import { useLocation, useNavigate } from 'react-router-dom';

 export default function Table({ tableHead, children }) {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();

   const { pathname } = location;

   const [order, setOrder] = useState("DESC");
   const [column, setColumn] = useState(null);

   const { page, limit } = useSelector(
     (state) => state.filter
   );

   const handleHeaderClick = (columnName) => {
     const query = `?page=${page}&limit=${limit}&orderBy=${columnName}&sort=${order}`;
     // Toggle the sorting order if the same column is clicked again
     if (columnName === column) {
       setOrder(order === "ASC" ? "DESC" : "ASC");
       setColumn(columnName);
     } else {
       setOrder(order === "ASC" ? "DESC" : "ASC");
       setColumn(columnName);
     }
     dispatch(sortData({ orderBy: columnName, sort: order }));
     navigate(`${pathname}${query}`);
   };


   return (
     <div className='table'>
       <table>
         <thead>
           <tr>
             {
               tableHead.map((item, index) => {
                 return <th
                   onClick={() => {
                     item.sort && handleHeaderClick(item.order);
                   }}
                   key={index}
                   className={item.className}
                   data-sort={item.sort}
                   data-order={item.order}
                 >
                   {item.title}
                 </th>
               })
             }
           </tr>
         </thead>
         {children}
       </table>
     </div>
   )
 }



