import AddButton from '../common/Button/AddButton';
import FeesTable from './Table/FeesTable';


export default function Index() {
  return (
    <>
      <AddButton name={'AddEditFees'} modalTitle={'اضافة مصاريف أخري'} />
      <FeesTable />
    </>
  )
}
