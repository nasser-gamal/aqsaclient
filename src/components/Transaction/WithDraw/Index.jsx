import { useFindAllWithDrawQuery } from '../../../app/features/transaction/withDrawApi';
import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import WithdrawTable from './Table/WithdrawTable'

export default function Index() {
  const { data, isLoading } = useFindAllWithDrawQuery();


  return (
    <>
      <AddButton
        name={'AddEditWithdraw'}
        modalTitle='اضافة عملية سحب جديدة'
      />
      <WithdrawTable data={data} isLoading={isLoading} />
      {/* <Pagination /> */}
    </>
  )
}
