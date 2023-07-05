import { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import CustomInput from '../../common/FormFields/input/CustomInput';
import { notify } from '../../../utils/notify';
import { useCreateAgentMutation, useUpdateAgentMutation } from '../../../app/features/user/agentApi';
import { validateAgent } from '../../../utils/validation';

import { hideLoader, showLoader } from '../../../app/features/loader/loaderSlice';
import { closeModal } from '../../../app/features/modal/modalSlice';
import FormButtons from '../../UI/FormButtons/FormButtons';


export default function AddEditAgent() {
  const { childrenProps } = useSelector(state => state.modal);


  const dispatch = useDispatch();

  const [form, setForm] = useState({
    accountName: childrenProps?.user.accountName || "",
    email: childrenProps?.user.email || "",
    userName: childrenProps?.user.userName || "",
    phoneNumber: childrenProps?.user.phoneNumber || "",
    address: childrenProps?.user.address || "",
    nationalId: childrenProps?.user.nationalId || "",
    accountNumber: childrenProps?.user.accountNumber || ""
  });


  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setForm({ ...form, [name]: value });
  };


  const [createAgent, { isLoading: createLoading }] = useCreateAgentMutation();
  const [updateAgent, { isLoading: updateLoading }] = useUpdateAgentMutation();


  useEffect(() => {
    if (createLoading || updateLoading) {
      dispatch(showLoader())
    } else {
      dispatch(hideLoader())
    }
  }, [dispatch, createLoading, updateLoading]);


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const error = validateAgent(form);
      console.log('error', error)
      if (error) {
        notify('error', error);
      } else {
        const response = childrenProps?.user
          ? await updateAgent({ agentId: childrenProps?.user.id, form }).unwrap()
          : await createAgent(form).unwrap();
        notify('success', response.message);

        setTimeout(() => {
          dispatch(closeModal())
        }, 1000)
      }
    } catch (error) {
      console.log(error)
      notify('error', error.data.message);
    }
  }





  return (
    <div>
      <form onSubmit={onSubmit}>
        <CustomInput
          type='text'
          name='accountName'
          label={'اسم الحساب'}
          value={form.accountName}
          onChange={(e) => onChange(e)}

        />
        <CustomInput
          type='text'
          name='userName'
          label={'اسم صاحب الحساب'}
          value={form.userName}
          onChange={(e) => onChange(e)}

        />
        <CustomInput
          type='text'
          name='accountNumber'
          label={'رقم الحساب'}
          value={form.accountNumber}
          onChange={(e) => onChange(e)}

        />
        <CustomInput
          type='email'
          name='email'
          label={'البريد الالكتروني'}
          value={form.email}
          onChange={(e) => onChange(e)}

        />
        <CustomInput
          type='text'
          name='phoneNumber'
          label={'رقم الموبايل'}
          value={form.phoneNumber}
          onChange={(e) => onChange(e)}

        />
        <CustomInput
          type='text'
          name='nationalId'
          label={'الرقم القومي'}
          value={form.nationalId}
          onChange={(e) => onChange(e)}
        />
        <CustomInput
          type='text'
          name='address'
          label={'العنوان'}
          value={form.address}
          onChange={(e) => onChange(e)}
        />
        <FormButtons />
      </form>
    </div>
  )
}
