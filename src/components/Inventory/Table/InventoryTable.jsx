/* eslint-disable react/prop-types */



export default function InventoryTable({ data }) {


  return (
    <div className='report-table'>
      <table>
        <tbody>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              أرصدة التجار
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              {data?.totalAgentTreasury}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              أرصدة الحسابات
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              (-)   {data?.totalBankAmount}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              أرصدة المزودين
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              (-)     {data?.totalProviderTreasury}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              أرصدة أخري
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              (-)    {data?.totalAddionalTreasury}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              الربح
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              (-) {data?.totalProfits}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#ebebeb',
            }}>
              مستحقات
            </td>
            <td style={{
              backgroundColor: '#4caf5042',
              fontWeight: 'bold'
            }}>
              (-) {data?.totalDues}
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: '#4fb5ab',
              color: "white"
            }}>
              صافي الرصيد المتاح
            </td>
            <td style={{
              backgroundColor: '#4fb5ab',
              color: "white",
              fontWeight: 'bold'
            }}>
              {data?.totalCurrentBalance}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
