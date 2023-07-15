import { useFindAllDepositesQuery } from '../../../app/features/transaction/depositeApi';
import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import DepositTable from './Table/DepositTable'
import './index.modules.css';

export default function Index() {

  const { data, isLoading } = useFindAllDepositesQuery();



  return (
    <>
      <AddButton
        name={'AddEditDeposit'}
        modalTitle='اضافة عملية ايداع جديدة'
      />
      <DepositTable data={data} isLoading={isLoading} />
      {/* <Pagination /> */}
    </>
  )
}
