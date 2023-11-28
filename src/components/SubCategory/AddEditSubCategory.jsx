/* eslint-disable react/prop-types */
import { useDispatch, } from 'react-redux';

import { useEffect, useState } from 'react';
import { TextInput } from '@mantine/core';

import { hideLoader, showLoader } from '../../app/features/loader/loaderSlice';

import FormButtons from '../UI/FormButtons/FormButtons';

import { notify } from '../../utils/notify';
import { modals } from '@mantine/modals';
import { useCreateSubCategoryMutation, useUpdateSubCategoryMutation } from '../../app/features/subCategory/subCategoryApi';
import { validateSubCategory } from '../../utils/validation';
import DropDown from './DropDown';

export default function AddEditSubCategory({ innerProps }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    categoryId: innerProps?.data?.categoryId | '',
    name: innerProps?.data?.name || "",
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createSubCategory, { isLoading: createLoading }] = useCreateSubCategoryMutation()
  const [updateSubCategory, { isLoading: updateLoading }] = useUpdateSubCategoryMutation()


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

      const error = validateSubCategory(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateSubCategory({ subCategoryId: innerProps?.data.id, form }).unwrap()
          : await createSubCategory(form).unwrap();
        notify('success', response.message);
        modals.closeAll()
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <DropDown
        form={form}
        setForm={setForm}
        value={innerProps?.data ? { label: innerProps?.data?.category?.name, value: innerProps?.data?.category?.id } : ''}
      />
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
