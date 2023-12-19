/* eslint-disable react/prop-types */

import { Table } from "@mantine/core";
import CustomTable from '../../../common/CustomTable/CustomTable';
import React from "react";


export default function AgentCommissisonTable({ data }) {
  const theads = [
    {
      title: "الفئة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الخدمة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "عدد العمليات",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "القيمة",
      className: "",
      order: "",
      sort: "",
    },

    {
      title: "الاجمالي",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "الشريحة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "نسبة العمولة",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "قيمة العمولة",
      className: "",
      order: "",
      sort: "",
    },
  ];

  const commissions = data?.commissions.slice().reverse();

  const rows = commissions?.map((commission, commissionIndex) => {
    
    return (
      <React.Fragment key={commissionIndex}>
        {commission?.commissionItems.map((item, itemIndex) => (
          <React.Fragment key={`${commissionIndex}-${itemIndex}`}>
            <Table.Tr key={`${commissionIndex}-${itemIndex}`}>
              {itemIndex === 0 && (
                <>
                  <Table.Td rowSpan={commission?.commissionItems.length}>
                    {commission?.service?.name}
                  </Table.Td>
                </>
              )}

              <Table.Td>{item?.subCategory?.name}</Table.Td>
              <Table.Td>{item.count}</Table.Td>
              <Table.Td>{item.amount}</Table.Td>

              {itemIndex === 0 && (
                <>
                  <Table.Td rowSpan={commission?.commissionItems.length}>
                    {commission?.amountTotal}
                  </Table.Td>
                  <Table.Td rowSpan={commission?.commissionItems.length}>
                    {commission?.segment?.title}
                  </Table.Td>
                  <Table.Td rowSpan={commission?.commissionItems.length}>
                    {commission?.segment?.percentage}%
                  </Table.Td>
                  <Table.Td rowSpan={commission?.commissionItems.length}>
                    {commission?.commissionAmount}
                  </Table.Td>
                </>
              )}
            </Table.Tr>

            {/* Add an empty row or a separator row between services */}
            {itemIndex === commission?.commissionItems.length - 1 && (
              <Table.Tr bg={'white'} key={`${commissionIndex}-separator`}>
                <Table.Td p={10} colSpan={8}></Table.Td>
              </Table.Tr>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  });









  const tFoot =
    <Table.Tr>
      <Table.Td colSpan={2}>
        الاجمالى
      </Table.Td>

      <Table.Td>
        {data?.totalCount}
      </Table.Td>
      <Table.Td>
        {data?.amountTotal}
      </Table.Td>
      <Table.Td colSpan={3}>
        {/* الاجمالى */}
      </Table.Td>
      <Table.Td>
        {data?.commissionAmount}
      </Table.Td>
    </Table.Tr>


  return (
    <CustomTable theads={theads} rows={rows} tFoot={tFoot} bg={'red'} />
    // <table border="1">
    //   <thead>
    //     <tr>
    //       <th>Service Name</th>
    //       <th>SubCategory Name</th>
    //       <th>Amount Total</th>
    //       <th>Commission Amount</th>
    //       <th>Commission Item Amount</th>
    //       <th>Commission Item Count</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {data?.commissions.map((commission, commissionIndex) => (
    //       <React.Fragment key={commissionIndex}>
    //         {commission?.commissionItems.map((item, itemIndex) => (
    //           <tr key={`${commissionIndex}-${itemIndex}`}>
    //             {itemIndex === 0 &&
    //               <td rowSpan={commission.commissionItems.length}>{commission.service.name}</td>
    //             }
    //             <td>{item.subCategory.name}</td>
    //             <td>{item.amount}</td>
    //             <td>{item.count}</td>
    //             {itemIndex === 0 && (
    //               <>
    //                 <td rowSpan={commission.commissionItems.length}>{commission.amountTotal}</td>
    //                 <td rowSpan={commission.commissionItems.length}>{commission.commissionAmount}</td>
    //               </>
    //             )}

    //           </tr>
    //         ))}
    //       </React.Fragment>
    //     ))}
    //     <tr>
    //       <td colSpan={2}>
    //         الاجمالى
    //       </td>
    //       <td>
    //         {data?.amountTotal}
    //       </td>
    //       <td colSpan={2}>
    //         {/* الاجمالى */}
    //       </td>
    //       <td>
    //         {data?.commissionAmount}
    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
  )
}
