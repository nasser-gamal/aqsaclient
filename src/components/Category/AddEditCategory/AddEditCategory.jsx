import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../../../app/features/category/categoryApi';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';
import { validateCategory } from '../../../utils/validation';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';

export default function AddEditCategory() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: childrenProps?.category.name || "",
    note: childrenProps?.category.note || ""
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
        const response = childrenProps?.category
          ? await updateCategory({ categoryId: childrenProps?.category.id, form }).unwrap()
          : await createCategory(form).unwrap();
        notify('success', response.message);

        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <CustomInput
        type='text'
        label='اسم الخدمة'
        name={'name'}
        value={form.name}
        onChange={(e) => onChange(e)}
      />
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
