import AddButton from '../common/Button/AddButton';
import BankTable from './Table/BankTable';


export default function Index() {
  return (
    <>
      <AddButton name={'AddEditBank'} modalTitle={'اضافة بنك'} />
      <BankTable />
    </>
  )
}
