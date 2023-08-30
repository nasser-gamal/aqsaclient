import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../../common/FormFields/input/CustomInput';
import FormButtons from '../../UI/FormButtons/FormButtons';


import { notify } from '../../../utils/notify';
import { validateProviderCommission } from '../../../utils/validation';

import { closeModal } from '../../../app/features/modal/modalSlice';
import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { DateInput } from '../../../utils/formatDate';
import { useCreateProviderCommissionMutation, useUpdateProviderCommissionMutation } from '../../../app/features/provider/providerCommissions';
import ProviderSelect from './ProviderSelect';

export default function AddEditProviderCommission() {
  const { childrenProps } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    providerId: childrenProps?.providerCommission.provider.id || "",
    commission: childrenProps?.providerCommission.commission || "",
    date: childrenProps?.providerCommission.date.split('T')[0] || DateInput(),
    note: childrenProps?.providerCommission.note || ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [createProviderCommission, { isLoading: createLoading }] = useCreateProviderCommissionMutation()
  const [updateProviderCommission, { isLoading: updateLoading }] = useUpdateProviderCommissionMutation()


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
      const error = validateProviderCommission(form);
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.providerCommission
          ? await updateProviderCommission({ providerCommissionId: childrenProps?.providerCommission.id, form }).unwrap()
          : await createProviderCommission(form).unwrap();

        notify('success', response.message);
        dispatch(closeModal())
      }
    } catch (error) {
      notify('error', error.data.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <ProviderSelect form={form} setForm={setForm} />
      <CustomInput
        type='text'
        label='العمولة'
        name={'commission'}
        value={form.commission}
        onChange={(e) => onChange(e)}
      />
      <CustomInput
        type='date'
        label='التاريخ'
        name={'date'}
        value={form.date}
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
