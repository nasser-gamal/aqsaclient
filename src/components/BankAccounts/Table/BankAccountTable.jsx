
import Table from '../../common/Table/Table';
import EditButton from '../../UI/TableButtons/EditButton';
import { useFindAllBankAccountsQuery } from '../../../app/features/bankAccount/bankAccountApi';
import DateAndTime from '../../UI/DateAndTime/DateAndTime';
import Spinner from '../../UI/Loader/Spinner';

export default function BankAccountTable() {

  const { data, isLoading } = useFindAllBankAccountsQuery();
  const tableHead = [
    {
      title: "اسم الحساب",
      className: "account-name",
      order: "accountName",
      sort: "ASC",
    },
    {
      title: "رقم الحساب",
      className: "account-number",
      order: "accountNumber",
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
              <td>{bankAccount.accountName}</td>
              <td>{bankAccount.bankNumber}</td>
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
