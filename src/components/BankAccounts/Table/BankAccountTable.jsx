/* eslint-disable react/prop-types */

import Table from '../../common/Table/Table';
import EditButton from '../../UI/TableButtons/EditButton';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import Spinner from '../../UI/Loader/Spinner';

export default function BankAccountTable({ data, isLoading }) {

  const tableHead = [
    {
      title: "رقم الحساب",
      className: "account-number",
      order: "accountNumber",
      sort: "ASC",
    },
   
    {
      title: "اسم الحساب",
      className: "bank",
      order: "bank",
      sort: "ASC",
    },
    {
      title: "البنك",
      className: "bank",
      order: "bank",
      sort: "ASC",
    },
    {
      title: "المبلغ الحالي",
      className: "balance",
      order: "balance",
      sort: "ASC",
    },
    {
      title: "ملحوظة",
      className: "note",
      order: "note",
      sort: "",
    },
    {
      title: "التاريخ",
      className: "",
      order: "",
      sort: "",
    },
    {
      title: "تعديل",
      className: "",
      order: "",
      sort: "",
    },
  ];


  if (isLoading) {
    return <Spinner />
  }


  return (
    <Table tableHead={tableHead}>
      <tbody>

        {
          data?.bankAccounts.map(bankAccount => {
            return <tr key={bankAccount.id}>
              <td>{bankAccount.bankNumber}</td>
              <td>{bankAccount.accountName}</td>
              <td>{bankAccount.bank.bankName}</td>
              <td>{bankAccount.balance}</td>
              <td>{bankAccount.note || "-"}</td>
              <td>
                <DateAndTime createdAt={bankAccount.createdAt} />
              </td>
              <td>
                <EditButton
                  editProps={{
                    name: 'AddEditBankAccount',
                    modalTitle: 'تعديل الحساب',
                    status: 'تعديل',
                    childrenProps: { bankAccount }
                  }}
                />
              </td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}
