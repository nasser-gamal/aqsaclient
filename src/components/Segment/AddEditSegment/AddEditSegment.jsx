import { useEffect, useState } from 'react';
import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateSegmentMutation, useUpdateSegmentMutation } from '../../../app/features/segment/segmentApi';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { validateSegment } from '../../../utils/validation';
import { notify } from '../../../utils/notify';
import { closeModal } from '../../../app/features/modal/modalSlice';

export default function AddEditSegment() {

  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: childrenProps?.segment.title || "",
    serviceId: childrenProps?.segment.serviceId || "",
    start: childrenProps?.segment.start || "",
    end: childrenProps?.segment.end || "",
    percentage: childrenProps?.segment.percentage || "",
    note: childrenProps?.segment.note || ""
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
        const response = childrenProps?.segment
          ? await updateSegment({ segmentId: childrenProps?.segment.id, form }).unwrap()
          : await createSegment(form).unwrap();
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
        label='الشريحة'
        name={'title'}
        value={form.title}
        onChange={(e) => onChange(e)}
      />
      <DropDown form={form} setForm={setForm} />
      <CustomInput
        type='text'
        label='من'
        name={'start'}
        value={form.start}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='text'
        label='إلي'
        name={'end'}
        value={form.end}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='text'
        label='النسبة'
        name={'percentage'}
        value={form.percentage}
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
