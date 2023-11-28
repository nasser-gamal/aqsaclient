/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import FormButtons from '../../UI/FormButtons/FormButtons';
import DropDown from './DropDown';
import { useDispatch } from 'react-redux';
import { useCreateSegmentMutation, useUpdateSegmentMutation } from '../../../app/features/segment/segmentApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { validateSegment } from '../../../utils/validation';
import { notify } from '../../../utils/notify';
import { TextInput } from '@mantine/core';

export default function AddEditSegment({ context, id, innerProps }) {

  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: innerProps?.data?.title || "",
    serviceId: innerProps?.data?.service?.id || "",
    start: innerProps?.data?.start || 0,
    end: innerProps?.data?.end || "",
    percentage: innerProps?.data?.percentage || 0,
    note: innerProps?.data?.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  };



  const [createSegment, { isLoading: createLoading }] = useCreateSegmentMutation();
  const [updateSegment, { isLoading: updateLoading }] = useUpdateSegmentMutation();


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
      const error = validateSegment(form);
      if (error) {
        notify('error', error);
      } else {
        const response = innerProps?.data
          ? await updateSegment({ segmentId: innerProps?.data.id, form }).unwrap()
          : await createSegment(form).unwrap();
        notify('success', response.message);
        context.closeModal(id)
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <TextInput m={'10 0'}
        type='text'
        label='الشريحة'
        name={'title'}
        value={form.title}
        onChange={(e) => onChange(e)}
      />
      <DropDown
        form={form}
        setForm={setForm}
        disabled={innerProps?.data ? true : false}
        value={innerProps?.data ? { label: innerProps?.data?.service?.name, value: innerProps?.data?.service?.id } : ''}

      />
      <TextInput m={'10 0'}
        type='number'
        label='من'
        name={'start'}
        value={form.start}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='number'
        label='إلي'
        name={'end'}
        value={form.end}
        onChange={(e) => onChange(e)}
      />
      <TextInput m={'10 0'}
        type='text'
        label='النسبة'
        name={'percentage'}
        value={form.percentage}
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
