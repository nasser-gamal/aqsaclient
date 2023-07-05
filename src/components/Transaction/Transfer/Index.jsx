import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import TransferTable from './Table/TransferTable'

export default function Index() {
  return (
    <>
      <AddButton
        name={'AddEditTransfer'}
        modalTitle='اضافة عملية جديدة'
      />
      <TransferTable />
      <Pagination />
    </>
  )
}
