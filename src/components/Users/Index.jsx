import { useDispatch } from 'react-redux';
import { useFindAllUsersQuery } from '../../app/features/user/userApi';
import AddButton from '../common/Button/AddButton';
import UserTable from './Table/UserTable'
import { useEffect } from 'react';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';


export default function Users() {

  const { data, isLoading } = useFindAllUsersQuery();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, isLoading]);


  return (
    <>
      <AddButton name={'AddEditUser'} modalTitle={'إضافة مستخدم'} />
      <UserTable users={data?.users} isLoading={isLoading} />

    </>
  )
}
