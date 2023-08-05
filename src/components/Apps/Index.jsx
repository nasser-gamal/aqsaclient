import { useFindAllAppsQuery } from '../../app/features/applications/applicationsApi';
import AddButton from '../common/Button/AddButton';
import AppTable from './Table/AppTable';


export default function Index() {
  const { data, isLoading } = useFindAllAppsQuery();

  return (
    <>
      <AddButton name={'AddEditApp'} modalTitle={'اضافة تطبيق'} />
      <AppTable data={data} isLoading={isLoading} />
    </>
  )
}
