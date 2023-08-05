import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';
import { validateApp } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateAppMutation, useUpdateAppMutation } from '../../../app/features/applications/applicationsApi';

export default function AddEditApp() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: childrenProps?.app.name || "",
    img: childrenProps?.app.img || "",
    apk: childrenProps?.app.apk || "",
    isLink: childrenProps?.app.isLink || true,
    link: childrenProps?.app.link || "",
    note: childrenProps?.app.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createApp, { isLoading: createLoading }] = useCreateAppMutation();
  const [updateApp, { isLoading: updateLoading }] = useUpdateAppMutation();


  useEffect(() => {
    if (createLoading || updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, createLoading, updateLoading]);




  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const error = validateApp(form);


      if (error) {
        notify('error', error);
      } else {
        const formData = new FormData()
        formData.append('name', form.name);
        formData.append('img', form.img);
        formData.append('apk', form.apk);
        formData.append('isLink', form.isLink);
        formData.append('link', form.link);
        formData.append('note', form.note);

        const response = childrenProps?.app
          ? await updateApp({ appId: childrenProps?.app.id, form: formData }).unwrap()
          : await createApp({ form: formData }).unwrap();
        notify('success', response.message);
        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        type='text'
        label='اسم التطبيق'
        name={'name'}
        value={form.name}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='file'
        label='صورة التطبيق'
        name={'img'}
        onChange={(e) => setForm({ ...form, img: e.target.files[0] })}
      />
      <div style={{
        padding: '10px 0'
      }}>
        <div className='d-flex' style={{
          gap: '10px',
          alignItems: "center"
        }}>
          <input
            style={{
              fontSize: '30px',
              width: 'fit-content',
              transform: 'scale(1.2)',
            }}
            id='link'
            type="radio"
            name='link'
            value={true}
            onChange={() => setForm({ ...form, isLink: true, apk: '' })}
            checked={form.isLink === true}
          />
          <label htmlFor="link">
            رابط تحميل
          </label>
        </div>
        <div className='d-flex' style={{
          gap: '10px',
          alignItems: "center"
        }}>
          <input
            style={{
              fontSize: '30px',
              width: 'fit-content',
              transform: 'scale(1.2)',
            }}
            id='direct'
            type="radio"
            name='direct'
            value={false}
            onChange={() => setForm({ ...form, isLink: false, link: '' })}
            checked={form.isLink === false}
          />
          <label htmlFor="direct">
            تحميل مباشر
          </label>
        </div>
      </div>
      {form.isLink ? <CustomInput
        type='text'
        label='رابط التطبيق'
        name={'link'}
        value={form.link}
        onChange={(e) => onChange(e)}
      /> : <CustomInput
        type='file'
        label='التطبيق apk'
        name={'apk'}
        onChange={(e) => setForm({ ...form, apk: e.target.files[0] })}
      />
      }
      <CustomInput
        type='textarea'
        label='محلوظة'
        name={'note'}
        value={form.note}
        onChange={(e) => onChange(e)}
      />
      <FormButtons />
    </form>
  )
}
