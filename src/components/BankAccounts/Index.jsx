import AddButton from '../common/Button/AddButton';
import BankAccountTable from './Table/BankAccountTable';


export default function Index() {
  return (
    <>
      <AddButton name={'AddEditBankAccount'} modalTitle={'اضافة حساب'} />
      <BankAccountTable />
    </>
  )
}
