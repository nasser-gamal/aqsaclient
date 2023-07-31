import axios from "axios";
import { useFindAllAppsQuery } from "../../app/features/applications/applicationsApi";
import apiEndpoints from "../../utils/endPoints";
import { saveAs } from "file-saver";
import { notify } from "../../utils/notify";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import Spinner from "../../components/UI/Loader/Spinner";

export default function Index() {
  const dispatch = useDispatch();
  const { data, isLoading } = useFindAllAppsQuery();


  const handleClick = async (e, appId) => {
    e.preventDefault();
    dispatch(showLoader())
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${apiEndpoints.applications.DOWNLOAD_APP}/${appId}`, {
        responseType: 'blob',
        withCredentials: true,
      });
      const file = new Blob([response.data]);
      saveAs(file, 'تجار الاقصي.apk');
      dispatch(hideLoader())
    } catch (err) {
      dispatch(hideLoader())
      notify('error', err.data.message)
    }
  }


  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      {data?.map(app => {
        return <div key={app.id}>
          <a onClick={(e) => {
            if (!app.isLink) {
              handleClick(e, app.id)
            }
          }
          } href={app.isLink ? app.link : `${import.meta.env.VITE_API_BASE_URL}/${app.apk}`}>
            <span>{app.name}</span>
            <img src={`${import.meta.env.VITE_API_BASE_URL}/${app.img}`} alt={`${import.meta.env.VITE_API_BASE_URL}/${app.img}`} />
          </a>
        </div>
      })}
    </div>
  )

}