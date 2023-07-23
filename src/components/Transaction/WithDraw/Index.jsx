import { useDispatch, useSelector } from 'react-redux';
import { useFindAllWithDrawQuery } from '../../../app/features/transaction/withDrawApi';
import EntrySelect from '../../UI/LimitSelect/EntrySelect';
import Pagination from '../../UI/Pagination/Pagination';
import AddButton from '../../common/Button/AddButton'
import WithdrawTable from './Table/WithdrawTable'

import './index.modules.css';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { resetFilter } from '../../../app/features/filter/filterSlice';

export default function Index() {

  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);

  const { data, isLoading, isFetching } = useFindAllWithDrawQuery({ page, limit, order: orderBy, sort });


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


  return (
    <>
      <div className='d-flex flex-between'>
        <AddButton
          name={'AddEditWithdraw'}
          modalTitle='اضافة عملية سحب جديدة'
          childrenProps={{ width: '700px' }}
        />
        <EntrySelect />
      </div>
      <WithdrawTable data={data} isLoading={isLoading} />
      {data?.pagination?.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
