import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import DepositTable from './Table/DepositTable'

export default function Index() {
  return (
    <>
      <AddButton
        name={'AddEditDeposit'}
        modalTitle='اضافة عملية جديدة'
      />
      <DepositTable />
      <Pagination />
    </>
  )
}
