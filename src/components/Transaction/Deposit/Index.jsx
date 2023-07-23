import { useDispatch, useSelector } from 'react-redux';
import { useFindAllDepositesQuery } from '../../../app/features/transaction/depositeApi';
import Pagination from '../../UI/Pagination/Pagination';
import AddButton from '../../common/Button/AddButton'
import DepositTable from './Table/DepositTable'
import './index.modules.css';
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { resetFilter } from '../../../app/features/filter/filterSlice';
import EntrySelect from '../../UI/LimitSelect/EntrySelect';

export default function Index() {
  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);
  const { data, isLoading, isFetching } = useFindAllDepositesQuery({ page, limit, order: orderBy, sort });



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
          name={'AddEditDeposit'}
          modalTitle='اضافة عملية ايداع جديدة'
        />
        <EntrySelect />
      </div>
      <DepositTable data={data} isLoading={isLoading} />
      {data?.pagination?.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
