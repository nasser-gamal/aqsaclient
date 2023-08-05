import axios from "axios";
import { useFindAllAppsQuery } from "../../app/features/applications/applicationsApi";
import apiEndpoints from "../../utils/endPoints";
import { saveAs } from "file-saver";
import { notify } from "../../utils/notify";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../app/features/loader/loaderSlice";
import Spinner from "../UI/Loader/Spinner";
import { formattedDate } from "../../utils/formatDate";

export default function Apps() {
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
      <h2 className="text-center">تطبيقات الاقصي</h2>
      <div className="app-boxes">
        {data?.map(app => {
          return <div className="app-box" key={app.id}>
            <img src={`${import.meta.env.VITE_API_BASE_URL}/${app.img}`} alt={`${import.meta.env.VITE_API_BASE_URL}/${app.img}`} />
            <span>{app.name}</span>
            <span className='updated'>
              أخر تحديث  {formattedDate(app.updatedAt)}
            </span>
            <a className="app-btn" onClick={(e) => {
              if (!app.isLink) {
                handleClick(e, app.id)
              }
            }
            } href={app.isLink ? app.link : `${import.meta.env.VITE_API_BASE_URL}/${app.apk}`}>
              {app.isLink ? 'الذهاب لرابط التحميل' : 'تحميل مباشر'}
            </a>
          </div>
        })}
      </div>
    </div>
  )

}
