import { useEffect } from 'react'
import { useFindAllTransferQuery } from '../../../app/features/transaction/transferApi'
import Pagination from '../../Pagination/Pagination'
import AddButton from '../../common/Button/AddButton'
import TransferTable from './Table/TransferTable'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice'

export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllTransferQuery()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton
        name={'AddEditTransfer'}
        modalTitle='اضافة عملية جديدة'
      />
      <TransferTable transfers={data?.transfers} />
      {/* <Pagination /> */}
    </>
  )
}
