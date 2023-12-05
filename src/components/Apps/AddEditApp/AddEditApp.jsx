/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useDispatch, } from 'react-redux';
import { notify } from '../../../utils/notify';
import { validateApp } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { useCreateAppMutation, useUpdateAppMutation } from '../../../app/features/applications/applicationsApi';
import { Radio, Stack, TextInput } from '@mantine/core';

export default function AddEditApp({ context, id, innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: innerProps?.data.name || "",
    img: innerProps?.data.img || "",
    apk: innerProps?.data.apk || "",
    isLink: innerProps?.data.isLink ? true : false,
    link: innerProps?.data.link || "",
    note: innerProps?.data.note || ""
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

        const response = innerProps?.data
          ? await updateApp({ appId: innerProps?.data.id, form: formData }).unwrap()
          : await createApp({ form: formData }).unwrap();
        notify('success', response.message);
        context.closeModal(id)
      }
    } catch (error) {
      console.log(error)
      // notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextInput m={'10 0'}
        type='text'
        label='اسم التطبيق'
        name={'name'}
        value={form.name}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='file'
        label='صورة التطبيق'
        name={'img'}
        onChange={(e) => setForm({ ...form, img: e.target.files[0] })}
      />
      <Stack m={'10 0'} gap={0}>
        <Radio
          mb={10}
          type="radio"
          name='link'
          value={true}
          onChange={() => setForm({ ...form, isLink: true, apk: '' })}
          checked={form.isLink === true}
          disabled={innerProps?.data}
          label='رابط تحميل'
        />
        <Radio
          type="radio"
          name='direct'
          value={false}
          onChange={() => setForm({ ...form, isLink: false, link: '' })}
          checked={form.isLink == false}
          disabled={innerProps?.data}
          label='تحميل مباشر'
        />
      </Stack>
      {form.isLink ? <TextInput m={'10 0'}
        type='text'
        label='رابط التطبيق'
        name={'link'}
        value={form.link}
        onChange={(e) => onChange(e)}
      /> :
        <TextInput m={'10 0'}
          type='file'
          label='التطبيق apk'
          name={'apk'}
          onChange={(e) => setForm({ ...form, apk: e.target.files[0] })}
        />
      }
      <TextInput m={'10 0'}
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
