import { useEffect } from 'react';
import { useFindAllAppsQuery } from '../../app/features/applications/applicationsApi';
import AddButton from '../common/Button/AddButton';
import AppTable from './Table/AppTable';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';


export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllAppsQuery();


  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoading])

  return (
    <>
      <AddButton name={'AddEditApp'} modalTitle={'اضافة تطبيق'} />
      <AppTable data={data} isLoading={isLoading} />
    </>
  )
}
