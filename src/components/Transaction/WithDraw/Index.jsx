import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import WithdrawTable from './Table/WithdrawTable'

export default function Index() {
  return (
    <>
      <AddButton
        name={'AddEditWithdraw'}
        modalTitle='اضافة عملية جديدة'
      />
      <WithdrawTable />
      <Pagination />
    </>
  )
}
