import { useEffect } from 'react';
import { useFindAllBankAccountsQuery } from '../../app/features/bankAccount/bankAccountApi';
import EntrySelect from '../UI/LimitSelect/EntrySelect';
import Pagination from '../UI/Pagination/Pagination';
import AddButton from '../common/Button/AddButton';
import BankAccountTable from './Table/BankAccountTable';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';
import { resetFilter } from '../../app/features/filter/filterSlice';


export default function Index() {
  const dispatch = useDispatch();
  const { page, limit, orderBy, sort } = useSelector(state => state.filter);

  const { data, isLoading, isFetching } = useFindAllBankAccountsQuery({ page, limit, order: orderBy, sort });


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
        <AddButton name={'AddEditBankAccount'} modalTitle={'اضافة حساب'} />
        <EntrySelect />
      </div>
      <BankAccountTable data={data} isLoading={isLoading} />
      {data?.pagination?.hasPagination && <Pagination pagination={data?.pagination} />}
    </>
  )
}
