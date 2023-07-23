import { useEffect } from 'react'
import { useFindAllTransferQuery } from '../../../app/features/transaction/transferApi'
import Pagination from '../../UI/Pagination/Pagination';
import AddButton from '../../common/Button/AddButton'
import TransferTable from './Table/TransferTable'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice'
import { resetFilter } from '../../../app/features/filter/filterSlice';
import EntrySelect from '../../UI/LimitSelect/EntrySelect';

export default function Index() {
  const dispatch = useDispatch();

  const { page, limit, orderBy, sort } = useSelector(state => state.filter);

  const { data, isLoading, isFetching } = useFindAllTransferQuery({ page, limit, order: orderBy, sort });

  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isFetching]);


  useEffect(() => {
    dispatch(
      resetFilter()
    );
  }, []);


  useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoading, isFetching])

  return (
    <>
      <div className='d-flex flex-between'>
        <AddButton
          name={'AddEditTransfer'}
          modalTitle='اضافة عملية جديدة'
        />
        <EntrySelect />
      </div>
      <TransferTable transfers={data?.transfers} />
      {data?.pagination?.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
