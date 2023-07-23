import { useFindAllWithDrawQuery } from '../../../app/features/transaction/withDrawApi';
import Pagination from '../../UI/Pagination/Pagination';
import AddButton from '../../common/Button/AddButton'
import WithdrawTable from './Table/WithdrawTable'

import './index.modules.css';

export default function Index() {
  const { data, isLoading } = useFindAllWithDrawQuery();


  return (
    <>
      <AddButton
        name={'AddEditWithdraw'}
        modalTitle='اضافة عملية سحب جديدة'
        childrenProps={{ width: '700px' }}
      />
      <WithdrawTable data={data} isLoading={isLoading} />
      {/* <Pagination /> */}
    </>
  )
}
