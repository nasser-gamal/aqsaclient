/* eslint-disable react/prop-types */

import './table.modules.css';

export default function Table({ tableHead, children }) {
  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
              tableHead.map((head, index) => {
                return <th key={index}>
                  {head.title}
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

