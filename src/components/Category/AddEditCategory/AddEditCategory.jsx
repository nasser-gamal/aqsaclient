/* eslint-disable react/prop-types */
import { useDispatch, } from 'react-redux';

import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';

import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../app/features/category/categoryApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

import FormButtons from '../../UI/FormButtons/FormButtons';

import { validateCategory } from '../../../utils/validation';
import { notify } from '../../../utils/notify';
import { modals } from '@mantine/modals';

export default function AddEditCategory({ innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: innerProps?.data?.name || "",
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation()


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

      const error = validateCategory(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateCategory({ categoryId: innerProps?.data.id, form }).unwrap()
          : await createCategory(form).unwrap();
        notify('success', response.message);
        modals.closeAll()
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextInput m={'10 0'}
        type='text'
        label='اسم الخدمة'
        name={'name'}
        value={form.name}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='text'
        label='محلوظة'
        name={'note'}
        value={form.note}
        onChange={(e) => onChange(e)}
      />
      <FormButtons />
    </form>
  )
}
